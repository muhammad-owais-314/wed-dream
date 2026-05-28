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