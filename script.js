  /* ── nave bar ── */

$(document).ready(() =>{
    $.get('navebar.html', (data) =>{
        console.log(data)
        $('#nav-container').html(data)
    })
})
  
/* ── FOOTER ── */

$(document).ready(() =>{
    $.get('footer.html', (data) =>{
        console.log(data)
        $('#footer-container').html(data)
    })
})

/* =========================
   HERO ANIMATION
========================= */

const fadeElements = document.querySelectorAll('.fade-up');

setTimeout(() => {

  fadeElements.forEach((el) => {
    el.classList.add('visible');
  });

}, 200);

// <!-- ========== POPULAR CATEGORIES SECTION ========== -->

(function(){
  const track = document.getElementById('catTrack');
  const prevBtn = document.getElementById('catPrev');
  const nextBtn = document.getElementById('catNext');
  const dotsWrap = document.getElementById('catDots');
  const cards = track.querySelectorAll('.cat-card');

  let current = 0;
  let visibleCount = 5;
  let maxStep = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragDelta = 0;
  let currentTranslate = 0;

  /* How many cards fit on screen */
  function getVisible() {
    const w = window.innerWidth;
    if (w <= 380)  return 1;
    if (w <= 575)  return 1;
    if (w <= 767)  return 2;
    if (w <= 991)  return 3;
    if (w <= 1199) return 4;
    return 5;
  }

  /* Single card + gap width */
  function cardStepW() {
    if (!cards[0]) return 0;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
    return cards[0].offsetWidth + gap;
  }

  /* Rebuild dots */
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxStep; i++) {
      const d = document.createElement('button');
      d.className = 'cat-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  /* Move to index */
  function goTo(index) {
    current = Math.max(0, Math.min(index, maxStep));
    currentTranslate = -(current * cardStepW());
    track.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform = 'translateX(' + currentTranslate + 'px)';
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxStep;
    dotsWrap.querySelectorAll('.cat-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  /* Init / resize */
  function init() {
    visibleCount = getVisible();
    maxStep = Math.max(0, cards.length - visibleCount);
    if (current > maxStep) current = maxStep;
    buildDots();
    goTo(current);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* ── TOUCH / DRAG ── */
  function onDragStart(x) {
    isDragging = true;
    dragStartX = x;
    dragDelta = 0;
    track.style.transition = 'none';
  }

  function onDragMove(x) {
    if (!isDragging) return;
    dragDelta = x - dragStartX;
    track.style.transform = 'translateX(' + (currentTranslate + dragDelta) + 'px)';
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const threshold = cardStepW() * 0.25;
    if (dragDelta < -threshold && current < maxStep) {
      goTo(current + 1);
    } else if (dragDelta > threshold && current > 0) {
      goTo(current - 1);
    } else {
      goTo(current); // snap back
    }
    dragDelta = 0;
  }

  /* Touch events */
  track.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
  track.addEventListener('touchend',   onDragEnd);

  /* Mouse drag */
  track.addEventListener('mousedown',  e => { onDragStart(e.clientX); track.style.cursor = 'grabbing'; });
  window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
  window.addEventListener('mouseup',   () => { if (isDragging) { onDragEnd(); track.style.cursor = ''; } });

  /* Prevent link clicks on drag */
  track.addEventListener('dragstart', e => e.preventDefault());

  /* Resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 120);
  });

  init();
})();

// ==================================================================

// Animate counter when section scrolls into view
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const isDecimal = el.dataset.decimal === 'true';
  const duration = 2000;
  const stepTime = 16;
  const steps = duration / stepTime;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal
      ? (current / 10).toFixed(1)
      : Math.round(current).toLocaleString();
  }, stepTime);
}

// IntersectionObserver — jab screen pe aaye tab start ho
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.count-num').forEach(animateCount);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('#statsGrid').forEach(el => statsObserver.observe(el));