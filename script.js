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
/* ============================================================
   WEDDREAM — HERO SECTION JS
   hero-section.js
   Load this at the end of <body>:
   <script src="hero-section.js"></script>
============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════
     VENDOR DATA  (real WedDream vendors)
  ══════════════════════════════════════ */
  var VENDORS = [
    /* Halls */
    { name:'Pearl Continental Banquets', cat:'halls',        area:'Karachi',   price:'PKR 5,00,000+',  tag:'Hall',   tc:'dt-hall', icon:'fa-building-columns', url:'vendor-detail.html?cat=halls&id=hall-1' },
    { name:'Mövenpick Grand Hall',       cat:'halls',        area:'Karachi',   price:'PKR 3,50,000+',  tag:'Hall',   tc:'dt-hall', icon:'fa-building-columns', url:'vendor-detail.html?cat=halls&id=hall-2' },
    { name:"Faletti's Palace Lawn",      cat:'halls',        area:'Lahore',    price:'PKR 2,80,000+',  tag:'Hall',   tc:'dt-hall', icon:'fa-building-columns', url:'vendor-detail.html?cat=halls&id=hall-3' },
    { name:'Crown Garden Banquets',      cat:'halls',        area:'Islamabad', price:'PKR 1,80,000+',  tag:'Hall',   tc:'dt-hall', icon:'fa-building-columns', url:'vendor-detail.html?cat=halls&id=hall-4' },
    { name:'Serena Hotel Lawns',         cat:'halls',        area:'Lahore',    price:'PKR 4,20,000+',  tag:'Hall',   tc:'dt-hall', icon:'fa-building-columns', url:'vendor-detail.html?cat=halls&id=hall-5' },
    /* Caterers */
    { name:'Royal Dastarkhwan Catering', cat:'caterers',     area:'Karachi',   price:'PKR 1,200/head', tag:'Catering',tc:'dt-cat', icon:'fa-utensils',         url:'vendor-detail.html?cat=caterers&id=cat-1' },
    { name:'Butt Saab Catering Service', cat:'caterers',     area:'Lahore',    price:'PKR 950/head',   tag:'Catering',tc:'dt-cat', icon:'fa-utensils',         url:'vendor-detail.html?cat=caterers&id=cat-2' },
    { name:'Shan-e-Karachi Caterers',    cat:'caterers',     area:'Karachi',   price:'PKR 1,100/head', tag:'Catering',tc:'dt-cat', icon:'fa-utensils',         url:'vendor-detail.html?cat=caterers&id=cat-3' },
    { name:'Paradise Biryani Catering',  cat:'caterers',     area:'Islamabad', price:'PKR 800/head',   tag:'Catering',tc:'dt-cat', icon:'fa-utensils',         url:'vendor-detail.html?cat=caterers&id=cat-4' },
    /* Decorators */
    { name:'Zaroon Events & Decor',      cat:'decorators',   area:'Karachi',   price:'PKR 80,000+',    tag:'Decor',  tc:'dt-dec', icon:'fa-wand-magic-sparkles',url:'vendor-detail.html?cat=decorators&id=dec-1' },
    { name:'Floral Dreams by Maha',      cat:'decorators',   area:'Lahore',    price:'PKR 65,000+',    tag:'Decor',  tc:'dt-dec', icon:'fa-wand-magic-sparkles',url:'vendor-detail.html?cat=decorators&id=dec-2' },
    { name:'Royal Touch Decorators',     cat:'decorators',   area:'Islamabad', price:'PKR 70,000+',    tag:'Decor',  tc:'dt-dec', icon:'fa-wand-magic-sparkles',url:'vendor-detail.html?cat=decorators&id=dec-3' },
    { name:'Elegance Events Decor',      cat:'decorators',   area:'Karachi',   price:'PKR 90,000+',    tag:'Decor',  tc:'dt-dec', icon:'fa-wand-magic-sparkles',url:'vendor-detail.html?cat=decorators&id=dec-4' },
    /* Photographers */
    { name:'Walima Photography Studio',  cat:'photographers',area:'Karachi',   price:'PKR 1,20,000+',  tag:'Photo',  tc:'dt-ph',  icon:'fa-camera',           url:'vendor-detail.html?cat=photographers&id=ph-1' },
    { name:'Lenscraft Wedding Films',    cat:'photographers',area:'Lahore',    price:'PKR 1,50,000+',  tag:'Photo',  tc:'dt-ph',  icon:'fa-camera',           url:'vendor-detail.html?cat=photographers&id=ph-2' },
    { name:'Noor Cinematic Studios',     cat:'photographers',area:'Karachi',   price:'PKR 95,000+',    tag:'Photo',  tc:'dt-ph',  icon:'fa-camera',           url:'vendor-detail.html?cat=photographers&id=ph-3' },
    { name:'Pixels & Pearls Photography',cat:'photographers',area:'Islamabad', price:'PKR 1,00,000+',  tag:'Photo',  tc:'dt-ph',  icon:'fa-camera',           url:'vendor-detail.html?cat=photographers&id=ph-4' },
    /* Car Rentals */
    { name:'Classic Bridal Cars Karachi',cat:'cars',         area:'Karachi',   price:'PKR 15,000/day', tag:'Cars',   tc:'dt-car', icon:'fa-car',              url:'vendor-detail.html?cat=cars&id=car-1' },
    { name:'Rolls Royce Rentals PK',     cat:'cars',         area:'Lahore',    price:'PKR 40,000/day', tag:'Cars',   tc:'dt-car', icon:'fa-car',              url:'vendor-detail.html?cat=cars&id=car-2' },
    { name:'Vintage Wedding Wheels',     cat:'cars',         area:'Karachi',   price:'PKR 18,000/day', tag:'Cars',   tc:'dt-car', icon:'fa-car',              url:'vendor-detail.html?cat=cars&id=car-3' },
    { name:'Premium Drive Islamabad',    cat:'cars',         area:'Islamabad', price:'PKR 12,000/day', tag:'Cars',   tc:'dt-car', icon:'fa-car',              url:'vendor-detail.html?cat=cars&id=car-4' },
  ];

  var CAT_LABELS = {
    halls:'Wedding Halls', caterers:'Catering',
    decorators:'Decoration', photographers:'Photography', cars:'Car Rentals'
  };

  /* ══════════════════════════════════════
     SEARCH
  ══════════════════════════════════════ */
  var inp  = document.getElementById('wdSrchInput');
  var drop = document.getElementById('wdDrop');
  var sbtn = document.getElementById('wdSbtn');

  if (!inp || !drop || !sbtn) return; /* guard if section not present */

  function esc(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, q) {
    if (!q) return text;
    return text.replace(
      new RegExp('(' + esc(q) + ')', 'gi'),
      '<mark style="background:rgba(200,155,44,0.22);color:#c89b2c;border-radius:2px;padding:0 1px">$1</mark>'
    );
  }

  function itemHTML(v, q) {
    return '<div class="wd-drop-item" onclick="location.href=\'' + v.url + '\'">' +
      '<div class="wd-drop-ico"><i class="fa-solid ' + v.icon + '"></i></div>' +
      '<div>' +
        '<div class="wd-drop-name">' + highlight(v.name, q) + '</div>' +
        '<div class="wd-drop-meta"><i class="fa-solid fa-location-dot" style="opacity:0.45;margin-right:4px"></i>' + v.area + ' &nbsp;·&nbsp; ' + v.price + '</div>' +
      '</div>' +
      '<span class="wd-drop-tag ' + v.tc + '">' + v.tag + '</span>' +
    '</div>';
  }

  function renderDrop(results, q) {
    if (!q || !q.trim()) {
      /* show popular on focus */
      var html = '<div class="wd-drop-hd">✦ &nbsp; Popular Vendors</div>';
      html += VENDORS.slice(0, 5).map(function(v){ return itemHTML(v, ''); }).join('');
      drop.innerHTML = html;
      drop.classList.add('open');
      return;
    }

    if (!results.length) {
      drop.innerHTML = '<div class="wd-drop-empty">No vendors found for &ldquo;' + q + '&rdquo;</div>';
      drop.classList.add('open');
      return;
    }

    /* group by category */
    var groups = {};
    results.forEach(function(v) {
      if (!groups[v.cat]) groups[v.cat] = [];
      groups[v.cat].push(v);
    });

    var html = '';
    Object.keys(groups).forEach(function(cat) {
      html += '<div class="wd-drop-hd">' + (CAT_LABELS[cat] || cat) + '</div>';
      html += groups[cat].map(function(v){ return itemHTML(v, q); }).join('');
    });
    drop.innerHTML = html;
    drop.classList.add('open');
  }

  function doSearch() {
    var q = inp.value.trim();
    if (!q) { renderDrop([], ''); return; }
    var ql = q.toLowerCase();
    var results = VENDORS.filter(function(v) {
      return v.name.toLowerCase().indexOf(ql) > -1 ||
             v.area.toLowerCase().indexOf(ql) > -1 ||
             v.cat.indexOf(ql) > -1;
    }).slice(0, 8);
    renderDrop(results, q);
  }

  function goSearch() {
    var q = inp.value.trim();
    if (q) window.location.href = 'vendors.html?search=' + encodeURIComponent(q);
  }

  inp.addEventListener('input',  doSearch);
  inp.addEventListener('focus',  function() { if (!inp.value.trim()) renderDrop([], ''); });
  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter')  goSearch();
    if (e.key === 'Escape') drop.classList.remove('open');
  });
  sbtn.addEventListener('click', function() {
    var q = inp.value.trim();
    if (q) goSearch(); else drop.classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    var bar = document.getElementById('wdSbar');
    if (bar && !bar.contains(e.target) && !drop.contains(e.target)) {
      drop.classList.remove('open');
    }
  });

  /* ══════════════════════════════════════
     SLIDESHOW
  ══════════════════════════════════════ */
  var slides   = document.querySelectorAll('.wd-slide');
  var dotNavs  = document.querySelectorAll('.wd-dotnav');
  var curSlide = 0;
  var slideTimer;

  window.wdGoSlide = function (i) {
    slides[curSlide].classList.remove('act');
    dotNavs[curSlide].classList.remove('act');
    curSlide = i;
    slides[curSlide].classList.add('act');
    dotNavs[curSlide].classList.add('act');
    clearInterval(slideTimer);
    slideTimer = setInterval(function () { wdGoSlide((curSlide + 1) % slides.length); }, 5500);
  };
  slideTimer = setInterval(function () { wdGoSlide((curSlide + 1) % slides.length); }, 5500);

  /* ══════════════════════════════════════
     FLOATING PARTICLES
  ══════════════════════════════════════ */
  var hero = document.getElementById('hero');
  if (hero) {
    var pc = [
      'rgba(200,155,44,0.22)', 'rgba(185,59,86,0.16)',
      'rgba(200,155,44,0.14)', 'rgba(255,255,255,0.06)'
    ];
    for (var i = 0; i < 22; i++) {
      var p = document.createElement('div');
      p.className = 'wd-particle';
      var s = Math.random() * 5 + 1.5;
      p.style.cssText =
        'width:'  + s + 'px;' +
        'height:' + s + 'px;' +
        'background:' + pc[Math.floor(Math.random() * 4)] + ';' +
        'left:'   + (Math.random() * 100) + '%;' +
        'bottom:-8px;' +
        'animation-duration:'  + (Math.random() * 14 + 9) + 's;' +
        'animation-delay:'     + (Math.random() * -22) + 's;';
      hero.appendChild(p);
    }
  }

  /* ══════════════════════════════════════
     3D TILT ON ORBIT ORB  (mouse move)
  ══════════════════════════════════════ */
  var orbCore  = document.getElementById('wdOrbCore');
  var heroEl   = document.getElementById('hero');

  if (orbCore && heroEl) {
    heroEl.addEventListener('mousemove', function (e) {
      var r = heroEl.getBoundingClientRect();
      var x = (e.clientX - r.left)  / r.width  - 0.5;
      var y = (e.clientY - r.top)   / r.height - 0.5;
      orbCore.style.transform =
        'translate(-50%,-50%) translateY(0) ' +
        'rotateY(' + (x * 22) + 'deg) ' +
        'rotateX(' + (-y * 14) + 'deg)';
    });
    heroEl.addEventListener('mouseleave', function () {
      orbCore.style.transform = '';
    });
  }

})();

/* ============================================================
   LIGHT BURST REVEAL  —  paste at END of hero-section.js
============================================================ */

(function () {

  var heroEl = document.getElementById('hero');
  if (!heroEl) return;

  /* ── Canvas ── */
  var canvas = document.createElement('canvas');
  canvas.id  = 'wdBurstCanvas';
  heroEl.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var W, H, cx, cy;

  function resize() {
    W  = canvas.width  = heroEl.offsetWidth;
    H  = canvas.height = heroEl.offsetHeight;
    cx = W / 2;
    cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Hide all text first ── */
  var textSelectors = [
    '.wd-badge', '.wd-eyebrow', '.wd-title', '.wd-title-gold',
    '.wd-divider', '.wd-sub', '.wd-stats', '.wd-btns',
    '.wd-search-wrap', '.wd-chips'
  ];
  textSelectors.forEach(function (sel) {
    var el = heroEl.querySelector(sel);
    if (!el) return;
    el.style.cssText += ';opacity:0!important;transform:translateY(28px)!important;filter:blur(10px)!important;transition:none!important;animation:none!important;';
  });

  /* ── Draw burst ── */
  var animId;
  var startTime = null;
  var TOTAL = 2200; /* total burst duration ms */

  function draw(ts) {
    if (!startTime) startTime = ts;
    var elapsed = ts - startTime;
    var t = Math.min(elapsed / TOTAL, 1);

    ctx.clearRect(0, 0, W, H);

    /* Phase 1 — 0 to 0.35 : burst expands */
    /* Phase 2 — 0.35 to 0.65 : hold glow */
    /* Phase 3 — 0.65 to 1.0 : fade out */

    var radius, alpha;

    if (t < 0.35) {
      var p = t / 0.35;
      var ease = 1 - Math.pow(1 - p, 2.5);
      radius = ease * Math.max(W, H) * 0.82;
      alpha  = ease;
    } else if (t < 0.65) {
      radius = Math.max(W, H) * 0.82;
      alpha  = 1;
    } else {
      var p = (t - 0.65) / 0.35;
      var ease = Math.pow(p, 1.8);
      radius = Math.max(W, H) * 0.82;
      alpha  = 1 - ease;
    }

    /* Core white flash */
    var coreR = radius * 0.12;
    var core  = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    core.addColorStop(0,   'rgba(255,252,235,' + (0.92 * alpha) + ')');
    core.addColorStop(0.4, 'rgba(240,220,140,' + (0.55 * alpha) + ')');
    core.addColorStop(1,   'rgba(200,155,44,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();

    /* Mid gold glow */
    var mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.48);
    mid.addColorStop(0,    'rgba(200,155,44,' + (0.38 * alpha) + ')');
    mid.addColorStop(0.45, 'rgba(200,155,44,' + (0.14 * alpha) + ')');
    mid.addColorStop(0.75, 'rgba(185,59,86,'  + (0.06 * alpha) + ')');
    mid.addColorStop(1,    'rgba(185,59,86,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.48, 0, Math.PI * 2);
    ctx.fillStyle = mid;
    ctx.fill();

    /* Outer rose bloom */
    var outer = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
    outer.addColorStop(0,   'rgba(185,59,86,' + (0.09 * alpha) + ')');
    outer.addColorStop(0.5, 'rgba(185,59,86,' + (0.04 * alpha) + ')');
    outer.addColorStop(1,   'rgba(185,59,86,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = outer;
    ctx.fill();

    /* Sweep rays */
    var rayCount = 8;
    for (var i = 0; i < rayCount; i++) {
      var angle   = (i / rayCount) * Math.PI * 2;
      var rayLen  = radius * 0.9;
      var rayAlpha= 0.28 * alpha;
      var rg = ctx.createLinearGradient(
        cx, cy,
        cx + Math.cos(angle) * rayLen,
        cy + Math.sin(angle) * rayLen
      );
      rg.addColorStop(0,    'rgba(255,240,160,' + rayAlpha + ')');
      rg.addColorStop(0.35, 'rgba(200,155,44,'  + (rayAlpha * 0.5) + ')');
      rg.addColorStop(1,    'rgba(200,155,44,0)');
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(angle) * rayLen,
        cy + Math.sin(angle) * rayLen
      );
      ctx.lineWidth   = 1.2;
      ctx.strokeStyle = rg;
      ctx.stroke();
    }

    if (t < 1) {
      animId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, W, H);
      cancelAnimationFrame(animId);
    }
  }

  /* ── Reveal text lines one by one ── */
  var revealDelays = [0.9, 1.08, 1.22, 1.36, 1.50, 1.62, 1.74, 1.88, 2.02, 2.16];
  textSelectors.forEach(function (sel, i) {
    setTimeout(function () {
      var el = heroEl.querySelector(sel);
      if (!el) return;
      el.style.cssText = el.style.cssText
        .replace(/opacity:[^;]+!important;/g, '')
        .replace(/transform:[^;]+!important;/g, '')
        .replace(/filter:[^;]+!important;/g, '')
        .replace(/transition:[^;]+!important;/g, '')
        .replace(/animation:[^;]+!important;/g, '');
      el.style.transition = 'opacity 0.88s cubic-bezier(.19,1,.22,1), transform 0.88s cubic-bezier(.19,1,.22,1), filter 0.88s cubic-bezier(.19,1,.22,1)';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
      el.style.filter     = 'blur(0)';
    }, revealDelays[i] * 1000);
  });

  /* ── Start ── */
  animId = requestAnimationFrame(draw);

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





