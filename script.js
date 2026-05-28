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

const track = document.getElementById('catTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsEl = document.getElementById('sliderDots');
const cards = track.querySelectorAll('.cat-card');
const total = cards.length;
const visible = 5;
const maxSlide = total - visible;
let current = 0;

function getCardW() {
  return cards[0].getBoundingClientRect().width + 16;
}

function updateSlider() {
  track.style.transform = `translateX(-${current * getCardW()}px)`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= maxSlide;
  document.querySelectorAll('.dot').forEach((d,i) =>
    d.classList.toggle('active', i === current));
}

for (let i = 0; i <= maxSlide; i++) {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => { current = i; updateSlider(); };
  dotsEl.appendChild(d);
}

prevBtn.onclick = () => { if(current > 0) { current--; updateSlider(); } };
nextBtn.onclick = () => { if(current < maxSlide) { current++; updateSlider(); } };

updateSlider();
window.addEventListener('resize', updateSlider);

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