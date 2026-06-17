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
















/* ========== TOP RATED VENDORS JS ========== */
// ============================================================
// TOP VENDORS — Real Data (No Fake/Placeholder Entries)
// ============================================================

const TRV_VENDORS = [
  // ===== HALLS =====
  {
    id: 1, cat: "hall", catLabel: "Hall / Banquet", catIcon: "fa-building-columns",
    name: "Royal Banquet DHA", area: "DHA", rating: 4.8, starting_price: 450000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/hall1/900/600",
    verified: true, verifiedLabel: "Premium Verified",
    detailPage: "hall-detail.html", sectionPage: "halls.html", sectionLabel: "Browse All Halls"
  },
  {
    id: 2, cat: "hall", catLabel: "Hall / Banquet", catIcon: "fa-building-columns",
    name: "Al Noor Banquet DHA", area: "DHA", rating: 4.6, starting_price: 380000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/hall2/900/600",
    verified: true, verifiedLabel: "Premium Verified",
    detailPage: "hall-detail.html", sectionPage: "halls.html", sectionLabel: "Browse All Halls"
  },
  {
    id: 3, cat: "hall", catLabel: "Hall / Banquet", catIcon: "fa-building-columns",
    name: "Pearl Marquee DHA", area: "DHA", rating: 4.7, starting_price: 500000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/hall3/900/600",
    verified: true, verifiedLabel: "Premium Verified",
    detailPage: "hall-detail.html", sectionPage: "halls.html", sectionLabel: "Browse All Halls"
  },
  {
    id: 6, cat: "hall", catLabel: "Hall / Banquet", catIcon: "fa-building-columns",
    name: "Clifton Grand Hall", area: "Clifton", rating: 4.9, starting_price: 600000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/hall6/900/600",
    verified: true, verifiedLabel: "Premium Verified",
    detailPage: "hall-detail.html", sectionPage: "halls.html", sectionLabel: "Browse All Halls"
  },

  // ===== CATERING =====
  {
    id: 1, cat: "catering", catLabel: "Catering", catIcon: "fa-utensils",
    name: "Marcem Event Solutions", area: "DHA", rating: 4.8, starting_price: 450000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/cater1/900/600",
    verified: true, verifiedLabel: "Premium Caterer",
    detailPage: "catering-detail.html", sectionPage: "catering.html", sectionLabel: "Browse All Caterers"
  },
  {
    id: 11, cat: "catering", catLabel: "Catering", catIcon: "fa-utensils",
    name: "Hanif Rajput Caterers", area: "PECHS", rating: 4.9, starting_price: 450000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/cater11/900/600",
    verified: true, verifiedLabel: "ISO Certified | Brand of the Year",
    detailPage: "catering-detail.html", sectionPage: "catering.html", sectionLabel: "Browse All Caterers"
  },
  {
    id: 6, cat: "catering", catLabel: "Catering", catIcon: "fa-utensils",
    name: "Lals Catering", area: "Clifton", rating: 4.9, starting_price: 500000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/cater6/900/600",
    verified: true, verifiedLabel: "Premium Gourmet Caterer",
    detailPage: "catering-detail.html", sectionPage: "catering.html", sectionLabel: "Browse All Caterers"
  },
  {
    id: 2, cat: "catering", catLabel: "Catering", catIcon: "fa-utensils",
    name: "Quality Catering Services", area: "DHA", rating: 4.4, starting_price: 350000,
    price_suffix: "/ event", image: "https://picsum.photos/seed/cater2/900/600",
    verified: true, verifiedLabel: "Verified+10 Years | Est. 1996",
    detailPage: "catering-detail.html", sectionPage: "catering.html", sectionLabel: "Browse All Caterers"
  },

  // ===== DECORATORS =====
  {
    id: 1, cat: "decorators", catLabel: "Decorators", catIcon: "fa-palette",
    name: "VMP Event Management", area: "DHA", rating: 4.8, starting_price: 120000,
    price_suffix: "/ package", image: "https://picsum.photos/seed/decor1/900/600",
    verified: true, verifiedLabel: "Verified on Shadiyana.pk",
    detailPage: "decorating-detail.html", sectionPage: "decorating.html", sectionLabel: "Browse All Decorators"
  },
  {
    id: 6, cat: "decorators", catLabel: "Decorators", catIcon: "fa-palette",
    name: "DAWAT Event Management", area: "Clifton", rating: 4.9, starting_price: 180000,
    price_suffix: "/ package", image: "https://picsum.photos/seed/decor6/900/600",
    verified: true, verifiedLabel: "Premium Event Management",
    detailPage: "decorating-detail.html", sectionPage: "decorating.html", sectionLabel: "Browse All Decorators"
  },
  {
    id: 21, cat: "decorators", catLabel: "Decorators", catIcon: "fa-palette",
    name: "Atelier III", area: "Gulistan-e-Johar", rating: 4.7, starting_price: 95000,
    price_suffix: "/ project", image: "https://picsum.photos/seed/decor21/900/600",
    verified: true, verifiedLabel: "Verified on Banjaiga",
    detailPage: "decorating-detail.html", sectionPage: "decorating.html", sectionLabel: "Browse All Decorators"
  },
  {
    id: 11, cat: "decorators", catLabel: "Decorators", catIcon: "fa-palette",
    name: "Gadit l ADS", area: "PECHS", rating: 4.7, starting_price: 90000,
    price_suffix: "/ project", image: "https://picsum.photos/seed/decor11/900/600",
    verified: true, verifiedLabel: "9 Reviews on Houzz",
    detailPage: "decorating-detail.html", sectionPage: "decorating.html", sectionLabel: "Browse All Decorators"
  },

  // ===== PHOTOGRAPHERS =====
  {
    id: 1, cat: "photography", catLabel: "Photography", catIcon: "fa-camera",
    name: "AJ Studio Official", area: "DHA", rating: 4.9, starting_price: 65000,
    price_suffix: "/ package", image: "https://picsum.photos/seed/photo1/900/600",
    verified: true, verifiedLabel: "Texas School of Photography",
    detailPage: "photographer-detail.html", sectionPage: "photographers.html", sectionLabel: "Browse All Photographers"
  },
  {
    id: 3, cat: "photography", catLabel: "Photography", catIcon: "fa-camera",
    name: "K.Bridals Photography", area: "DHA", rating: 4.8, starting_price: 50000,
    price_suffix: "/ package", image: "https://picsum.photos/seed/photo3/900/600",
    verified: true, verifiedLabel: "Verified on B2C Pakistan",
    detailPage: "photographer-detail.html", sectionPage: "photographers.html", sectionLabel: "Browse All Photographers"
  },
  {
    id: 6, cat: "photography", catLabel: "Photography", catIcon: "fa-camera",
    name: "Dossani's Studio", area: "Clifton", rating: 4.7, starting_price: 60000,
    price_suffix: "/ package", image: "https://picsum.photos/seed/photo6/900/600",
    verified: true, verifiedLabel: "Embassy Approved | Est. 1970s",
    detailPage: "photographer-detail.html", sectionPage: "photographers.html", sectionLabel: "Browse All Photographers"
  },
  {
    id: 9, cat: "photography", catLabel: "Photography", catIcon: "fa-camera",
    name: "Maha Wajahat Khan", area: "Clifton", rating: 4.8, starting_price: 65000,
    price_suffix: "/ package", image: "https://picsum.photos/seed/photo9/900/600",
    verified: true, verifiedLabel: "Featured on Bloom Pakistan",
    detailPage: "photographer-detail.html", sectionPage: "photographers.html", sectionLabel: "Browse All Photographers"
  },

  // ===== CAR RENTALS =====
  {
    id: 1, cat: "carental", catLabel: "Car Rental", catIcon: "fa-car",
    name: "Dreamz Carz", area: "DHA", rating: 4.8, starting_price: 8000,
    price_suffix: "/ day", image: "https://picsum.photos/seed/car1/900/600",
    verified: true, verifiedLabel: "Most Rated & Recommended",
    detailPage: "carrental-detail.html", sectionPage: "carrentals.html", sectionLabel: "Browse All Car Rentals"
  },
  {
    id: 2, cat: "carental", catLabel: "Car Rental", catIcon: "fa-car",
    name: "Vigo Rent a Car", area: "DHA", rating: 4.7, starting_price: 7000,
    price_suffix: "/ day", image: "https://picsum.photos/seed/car2/900/600",
    verified: true, verifiedLabel: "Professional Chauffeur",
    detailPage: "carrental-detail.html", sectionPage: "carrentals.html", sectionLabel: "Browse All Car Rentals"
  },
  {
    id: 6, cat: "carental", catLabel: "Car Rental", catIcon: "fa-car",
    name: "BRV Rent a Car", area: "Clifton", rating: 4.6, starting_price: 9000,
    price_suffix: "/ day", image: "https://picsum.photos/seed/car6/900/600",
    verified: true, verifiedLabel: "Corporate Transportation",
    detailPage: "carrental-detail.html", sectionPage: "carrentals.html", sectionLabel: "Browse All Car Rentals"
  },
  {
    id: 46, cat: "carental", catLabel: "Car Rental", catIcon: "fa-car",
    name: "ZJ Rent A Car", area: "North Karachi", rating: 4.5, starting_price: 3500,
    price_suffix: "/ day", image: "https://picsum.photos/seed/car46/900/600",
    verified: true, verifiedLabel: "Special Rate PKR 3,500/day",
    detailPage: "carrental-detail.html", sectionPage: "carrentals.html", sectionLabel: "Browse All Car Rentals"
  }
];

// ─── SLIDER LOGIC ──────────────────────────────────────────────
let trvCurrentIdx = 0;
let trvFiltered   = [...TRV_VENDORS];
let trvAutoTimer;

function trvBuildStars(r) {
  const full = Math.floor(r), half = (r - full) >= 0.5 ? 1 : 0, empty = 5 - full - half;
  let s = '';
  for (let i = 0; i < full; i++)  s += '<i class="fas fa-star"></i>';
  if (half) s += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < empty; i++) s += '<i class="far fa-star"></i>';
  return s;
}

function trvFormatPKR(n) { return Number(n).toLocaleString('en-PK'); }

function trvPerView() {
  const w = window.innerWidth;
  if (w >= 1200) return 4;
  if (w >= 900)  return 3;
  if (w >= 580)  return 2;
  return 1;
}

function trvRenderCards() {
  document.getElementById('trvSlider').innerHTML = trvFiltered.map(v => `
    <div class="trv-card" onclick="window.location.href='${v.detailPage}?id=${v.id}&cat=${v.cat}'">
      <div class="trv-card-img">
        <img src="${v.image}" alt="${v.name}" onerror="this.src='https://picsum.photos/seed/fallback/900/600'"/>
        <div class="trv-card-img-overlay"></div>
        <div class="trv-category-badge"><i class="fa-solid ${v.catIcon}"></i> ${v.catLabel}</div>
        ${v.verified ? `<div class="trv-verified-badge"><i class="fa-solid fa-circle-check"></i> Verified</div>` : ''}
      </div>
      <div class="trv-card-body">
        <div>
          <div class="trv-card-name">${v.name}</div>
          <div class="trv-card-area"><i class="fa-solid fa-location-dot"></i> ${v.area}</div>
          <div class="trv-rating-row">
            <div class="trv-stars">${trvBuildStars(v.rating)}</div>
            <span class="trv-rating-pill">${v.rating}</span>
          </div>
          ${v.verified ? `<div class="trv-verified-label"><i class="fa-solid fa-badge-check"></i> ${v.verifiedLabel}</div>` : ''}
        </div>
        <div>
          <div class="trv-divider"></div>
          <div class="trv-price-label">Starting From</div>
          <div class="trv-price-val">PKR ${trvFormatPKR(v.starting_price)}<span>${v.price_suffix}</span></div>
          <div class="trv-card-bottom">
            <a href="${v.detailPage}?id=${v.id}&cat=${v.cat}" class="trv-view-btn" onclick="event.stopPropagation()">
              <i class="fa-solid fa-arrow-right"></i> Details
            </a>
            <a href="${v.sectionPage}" class="trv-section-link" onclick="event.stopPropagation()">
              ${v.sectionLabel} →
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  trvCurrentIdx = 0;
  trvUpdateSlider();
}

function trvUpdateSlider() {
  const slider  = document.getElementById('trvSlider');
  const perView = trvPerView();
  const maxIdx  = Math.max(0, trvFiltered.length - perView);
  trvCurrentIdx = Math.min(trvCurrentIdx, maxIdx);

  const cardW = slider.children[0] ? slider.children[0].offsetWidth + 24 : 0;
  slider.style.transform = `translateX(-${trvCurrentIdx * cardW}px)`;

  const prevBtn = document.getElementById('trvPrev');
  const nextBtn = document.getElementById('trvNext');
  if (prevBtn) prevBtn.disabled = trvCurrentIdx === 0;
  if (nextBtn) nextBtn.disabled = trvCurrentIdx >= maxIdx;

  const totalDots = Math.max(1, Math.ceil(trvFiltered.length / perView));
  const activeDot = Math.floor(trvCurrentIdx / perView);
  document.getElementById('trvDots').innerHTML = Array.from({length: totalDots}, (_, i) =>
    `<div class="trv-dot ${i === activeDot ? 'active' : ''}" onclick="trvGoTo(${i * perView})"></div>`
  ).join('');
}

function trvSlide(dir) {
  const perView = trvPerView();
  const maxIdx  = Math.max(0, trvFiltered.length - perView);
  trvCurrentIdx = Math.max(0, Math.min(trvCurrentIdx + dir, maxIdx));
  trvUpdateSlider();
}

function trvGoTo(idx) {
  trvCurrentIdx = idx;
  trvUpdateSlider();
}

function trvStartAuto() {
  if (trvAutoTimer) clearInterval(trvAutoTimer);
  trvAutoTimer = setInterval(() => {
    const perView = trvPerView();
    const maxIdx  = Math.max(0, trvFiltered.length - perView);
    if (trvFiltered.length <= perView) return;
    trvCurrentIdx = trvCurrentIdx >= maxIdx ? 0 : trvCurrentIdx + 1;
    trvUpdateSlider();
  }, 4500);
}

// ─── TAB FILTER ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.getElementById('trvTabs');
  if (!tabs) return;

  tabs.addEventListener('click', function(e) {
    const tab = e.target.closest('.trv-tab');
    if (!tab) return;
    document.querySelectorAll('.trv-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const cat = tab.dataset.cat;
    trvFiltered = cat === 'all' ? [...TRV_VENDORS] : TRV_VENDORS.filter(v => v.cat === cat);
    trvRenderCards();
    
    clearInterval(trvAutoTimer);
    trvStartAuto();
  });

  // ─── HOVER PAUSE ──────────────────────────────────────────────
  const sliderEl = document.getElementById('trvSlider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', () => {
      if (trvAutoTimer) clearInterval(trvAutoTimer);
    });
    sliderEl.addEventListener('mouseleave', trvStartAuto);
  }

  window.addEventListener('resize', trvUpdateSlider);

  // ─── INIT ─────────────────────────────────────────────────────
  trvRenderCards();
  trvStartAuto();
});