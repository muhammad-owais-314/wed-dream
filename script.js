  /* ── nave bar ── */
$(document).ready(() => {
    $.get('navebar.html', (data) => {
        $('#nav-container').html(data);

        // ✅ Navbar inject hone ke BAAD active set karo
        var page = window.location.pathname.split('/').pop().replace('.html','').toLowerCase() || 'index';

        var pageMap = {
            'index'        : 'home',
            'aboutme'      : 'about',
            'services'     : 'services',
            'decoration'   : 'services',
            'guestlist'    : 'guestlist',
            'gustlist'     : 'guestlist',
            'photographers': 'vendors',
            'makeup'       : 'vendors',
            'catering'     : 'vendors',
            'ai-planner'   : 'ai'
        };

        var activeKey = pageMap[page] || 'home';

        $('.wd-menu-link').removeClass('active');
        $('.wd-mobile-list > li > a').removeClass('active');

        $('.wd-menu-link[data-nav="' + activeKey + '"]').addClass('active');
        $('.wd-mobile-list > li > a[data-nav="' + activeKey + '"]').addClass('active');
    });
});

/* ── FOOTER ── */

$(document).ready(() => {
    $.get('footer.html', (data) => {
        $('#footer-container').html(data);
    });
});


/* =========================
   HERO ANIMATION
========================= */

// ── IMAGE SLIDESHOW ──────────────────────────────────
(function(){
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.slide-dot');
  let current  = 0;
  let timer;

  window.goToSlide = function(index){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    clearInterval(timer);
    timer = setInterval(nextSlide, 5500);
  };

  function nextSlide(){
    goToSlide((current + 1) % slides.length);
  }

  timer = setInterval(nextSlide, 5500);
})();

// ── FLOATING PARTICLES ───────────────────────────────
(function(){
  const hero   = document.querySelector('.hero');
  if(!hero) return;
  const colors = [
    'rgba(200,155,44,0.22)',
    'rgba(185,59,86,0.16)',
    'rgba(200,155,44,0.14)',
    'rgba(255,255,255,0.07)'
  ];
  for(let i = 0; i < 20; i++){
    const p    = document.createElement('div');
    p.className = 'hero-particle';
    const size  = Math.random() * 5 + 1.5;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*100}%;
      bottom:-10px;
      animation-duration:${Math.random()*14+9}s;
      animation-delay:${Math.random()*-20}s;
    `;
    hero.appendChild(p);
  }
})();



// <!-- ========== POPULAR CATEGORIES SECTION ========== -->

(function(){
  const track   = document.getElementById('catTrack');
  const prevBtn = document.getElementById('catPrev');
  const nextBtn = document.getElementById('catNext');
  const dotsWrap= document.getElementById('catDots');
  const cards   = track.querySelectorAll('.cat-card');

  let current=0, maxStep=0;
  let isDragging=false, dragStartX=0, dragDelta=0, currentTranslate=0;

  function getVisible(){
    const w=window.innerWidth;
    if(w<=380) return 1; if(w<=575) return 1;
    if(w<=767) return 2; if(w<=991) return 3;
    if(w<=1199) return 4; return 5;
  }
  function cardStepW(){
    if(!cards[0]) return 0;
    const gap=parseFloat(window.getComputedStyle(track).gap)||20;
    return cards[0].offsetWidth+gap;
  }
  function buildDots(){
    dotsWrap.innerHTML='';
    for(let i=0;i<=maxStep;i++){
      const d=document.createElement('button');
      d.className='cat-dot'+(i===current?' active':'');
      d.setAttribute('aria-label','Slide '+(i+1));
      d.addEventListener('click',()=>goTo(i));
      dotsWrap.appendChild(d);
    }
  }
  function goTo(index){
    current=Math.max(0,Math.min(index,maxStep));
    currentTranslate=-(current*cardStepW());
    track.style.transition='transform 0.45s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform='translateX('+currentTranslate+'px)';
    prevBtn.disabled=current===0;
    nextBtn.disabled=current>=maxStep;
    dotsWrap.querySelectorAll('.cat-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
  }
  function init(){
    const vis=getVisible();
    maxStep=Math.max(0,cards.length-vis);
    if(current>maxStep) current=maxStep;
    buildDots(); goTo(current);
  }
  prevBtn.addEventListener('click',()=>goTo(current-1));
  nextBtn.addEventListener('click',()=>goTo(current+1));

  track.addEventListener('touchstart',e=>{isDragging=true;dragStartX=e.touches[0].clientX;dragDelta=0;track.style.transition='none';},{passive:true});
  track.addEventListener('touchmove', e=>{if(!isDragging)return;dragDelta=e.touches[0].clientX-dragStartX;track.style.transform='translateX('+(currentTranslate+dragDelta)+'px)';},{passive:true});
  track.addEventListener('touchend',  ()=>{if(!isDragging)return;isDragging=false;const t=cardStepW()*0.25;if(dragDelta<-t&&current<maxStep)goTo(current+1);else if(dragDelta>t&&current>0)goTo(current-1);else goTo(current);dragDelta=0;});

  track.addEventListener('mousedown', e=>{isDragging=true;dragStartX=e.clientX;dragDelta=0;track.style.transition='none';track.style.cursor='grabbing';});
  window.addEventListener('mousemove',e=>{if(!isDragging)return;dragDelta=e.clientX-dragStartX;track.style.transform='translateX('+(currentTranslate+dragDelta)+'px)';});
  window.addEventListener('mouseup',  ()=>{if(!isDragging)return;isDragging=false;track.style.cursor='';const t=cardStepW()*0.25;if(dragDelta<-t&&current<maxStep)goTo(current+1);else if(dragDelta>t&&current>0)goTo(current-1);else goTo(current);dragDelta=0;});
  track.addEventListener('dragstart',e=>e.preventDefault());
  track.addEventListener('click',e=>{if(Math.abs(dragDelta)>8)e.stopPropagation();},true);

  let rt;
  window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(init,120);});
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