/* TADEV site interactions — nav drawer, lang toggle, scroll reveal, year */
(function(){
  // ---- year ----
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  // ---- language toggle (UI only, persisted) ----
  var stored = localStorage.getItem('tadev-lang') || 'TR';
  function applyLang(code){
    document.querySelectorAll('.lang button').forEach(function(b){
      b.classList.toggle('on', b.dataset.lang === code);
    });
    localStorage.setItem('tadev-lang', code);
  }
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.dataset.lang); });
  });
  applyLang(stored);

  // ---- mobile drawer ----
  var drawer = document.getElementById('mnav');
  function openD(){ if(drawer){ drawer.classList.add('open'); document.body.style.overflow='hidden'; } }
  function closeD(){ if(drawer){ drawer.classList.remove('open'); document.body.style.overflow=''; } }
  var burger = document.getElementById('burger');
  if(burger) burger.addEventListener('click', openD);
  var mclose = document.getElementById('mclose');
  if(mclose) mclose.addEventListener('click', closeD);
  if(drawer) drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeD); });

  // ---- scroll reveal (with safety nets so content can never stay hidden) ----
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function hardShow(el){
    el.classList.add('in');
    // Force visible without depending on the CSS transition completing
    // (covers paused-render / no-IO / reduced-motion edge cases).
    el.style.opacity = '1';
    el.style.transform = 'none';
  }
  function revealAll(){ reveals.forEach(hardShow); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.08, rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(function(el){ io.observe(el); });

    // 1) Reveal anything already in/near the viewport on load.
    function revealInView(){
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function(el){
        if(el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if(r.top < vh * 1.05 && r.bottom > 0){ el.classList.add('in'); io.unobserve(el); }
      });
    }
    revealInView();
    window.addEventListener('load', revealInView);
    // 2) Hard backstop: nothing stays invisible past this point.
    setTimeout(revealAll, 1400);
  } else {
    revealAll();
  }
})();
