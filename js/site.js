/* TADEV site interactions — shared footer, nav drawer, lang toggle, scroll reveal, year */
(function(){
  // ---- shared footer (single source of truth) ----
  // Each page carries a <footer class="foot" data-footer></footer> (or
  // <div id="site-footer"></div>) mount point; the markup lives here only.
  var FOOTER_HTML = ''
    + '<div class="wrap">'
    +   '<div class="foot__top">'
    +     '<div class="foot__about">'
    +       '<div class="foot__brand"><img src="assets/tadev-logo-white.png" alt="TADEV"><strong>TADEV</strong></div>'
    +       '<p>Türk-Alman Dayanışma ve Eğitim Vakfı.<br>İki ülke, üç kuşak, ortak bir gelecek.</p>'
    +     '</div>'
    +     '<div class="foot__col"><h4>Vakıf</h4>'
    +       '<a href="kurulus.html">Kuruluş</a><a href="amaclar.html">Amaçlarımız</a><a href="organlar.html">Organlarımız</a>'
    +     '</div>'
    +     '<div class="foot__col"><h4>Çalışmalar</h4>'
    +       '<a href="faaliyetler.html">Faaliyetler</a><a href="burslar.html">Burslar</a><a href="etkinlikler.html">Etkinlikler</a><a href="duyurular.html">Duyurular</a><a href="mutevelli-basvuru.html">Mütevelli Olun</a>'
    +     '</div>'
    +     '<div class="foot__col"><h4>Yasal</h4>'
    +       '<a href="kunye.html">Künye / Impressum</a><a href="gizlilik-politikasi.html">Gizlilik Politikası</a><a href="gizlilik-politikasi.html">KVKK Aydınlatma Metni</a><a href="gizlilik-politikasi.html#cerez">Çerez Politikası</a><a href="yasal-belgeler.html">Tüm Belgeler</a>'
    +     '</div>'
    +     '<div class="foot__col"><h4>İletişim</h4>'
    +       '<p>İstinye Caddesi Mertoğlu Apt.<br>No: 52/6, İstinye – Sarıyer<br>İstanbul 34460</p>'
    +       '<p style="margin-top:10px"><a href="tel:+902122299201">+90 212 229 92 01</a><br><a href="mailto:tadev@tadev.org.tr">tadev@tadev.org.tr</a></p>'
    +     '</div>'
    +   '</div>'
    +   '<div class="foot__bottom">'
    +     '<p>© <span data-year></span> TADEV — Türk-Alman Dayanışma ve Eğitim Vakfı. Tüm hakları saklıdır.</p>'
    +     '<nav class="foot__legal" aria-label="Yasal">'
    +       '<a href="kunye.html">Künye</a><a href="gizlilik-politikasi.html">Gizlilik Politikası</a><a href="gizlilik-politikasi.html">KVKK</a><a href="gizlilik-politikasi.html#cerez">Çerezler</a><a href="yasal-belgeler.html">Belgeler</a>'
    +     '</nav>'
    +     '<div class="lang"><button data-lang="TR">TR</button><button data-lang="DE">DE</button><button data-lang="EN">EN</button></div>'
    +   '</div>'
    +   '<div class="foot__credit"><a href="https://svenkoksal.com" target="_blank" rel="noopener">Tasarım & geliştirme — Sven Ata Can Köksal</a></div>'
    + '</div>';
  (function renderFooter(){
    var mount = document.querySelector('footer.foot[data-footer]') || document.getElementById('site-footer');
    if(!mount) return;
    var foot = document.createElement('footer');
    foot.className = 'foot';
    foot.innerHTML = FOOTER_HTML;
    mount.parentNode.replaceChild(foot, mount);
  })();

  // ---- shared header (single source of truth) ----
  // Each page carries a <header id="site-nav"></header> mount point; the nav
  // and the mobile drawer markup live here only.
  var NAV_LINKS = [
    ['index.html','Anasayfa'],
    ['kurulus.html','Kuruluş'],
    ['amaclar.html','Amaçlarımız'],
    ['organlar.html','Organlarımız'],
    ['faaliyetler.html','Faaliyetler'],
    ['burslar.html','Burslar'],
    ['etkinlikler.html','Etkinlikler'],
    ['duyurular.html','Duyurular']
  ];
  // map every page (incl. detail/sub pages) to the nav section it belongs to
  var ACTIVE_MAP = {
    'index.html':'index.html',
    'kurulus.html':'kurulus.html',
    'amaclar.html':'amaclar.html',
    'organlar.html':'organlar.html',
    'faaliyetler.html':'faaliyetler.html','projeler.html':'faaliyetler.html','proje-detay.html':'faaliyetler.html',
    'burslar.html':'burslar.html',
    'etkinlikler.html':'etkinlikler.html','etkinlik-detay.html':'etkinlikler.html',
    'duyurular.html':'duyurular.html','duyuru-detay.html':'duyurular.html'
  };
  (function renderHeader(){
    var mount = document.querySelector('header.nav[data-nav]') || document.getElementById('site-nav');
    if(!mount) return;
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var active = ACTIVE_MAP[here] || '';
    function links(){
      return NAV_LINKS.map(function(l){
        var on = (l[0] === active) ? ' class="active"' : '';
        return '<a href="' + l[0] + '"' + on + '>' + l[1] + '</a>';
      }).join('');
    }
    var nav = '<nav class="nav"><div class="nav__in">'
      + '<a class="nav__brand" href="index.html"><img src="assets/tadev-logo.png" alt="TADEV"><span>TADEV</span></a>'
      + '<div class="nav__links">' + links() + '</div>'
      + '<div class="nav__right">'
      +   '<div class="lang"><button data-lang="TR">TR</button><button data-lang="DE">DE</button><button data-lang="EN">EN</button></div>'
      +   '<a class="nav__cta nav__cta--sub" href="iletisim.html">İletişim</a>'
      +   '<a class="nav__cta" href="mutevelli-basvuru.html">Mütevelli Olun</a>'
      +   '<button class="nav__burger" id="burger" aria-label="Menü"><span></span><span></span><span></span></button>'
      + '</div></div></nav>';
    var mnav = '<div class="mnav" id="mnav">'
      + '<div class="mnav__top"><a class="nav__brand" href="index.html" style="color:#fff"><img src="assets/tadev-logo-white.png" alt="TADEV" style="height:28px"><span>TADEV</span></a><button class="mnav__close" id="mclose" aria-label="Kapat">✕</button></div>'
      + links()
      + '<a href="iletisim.html">İletişim</a>'
      + '<div class="mnav__foot"><div class="lang"><button data-lang="TR">TR</button><button data-lang="DE">DE</button><button data-lang="EN">EN</button></div>'
      +   '<a class="nav__cta nav__cta--sub" href="iletisim.html">İletişim</a><a class="nav__cta" href="mutevelli-basvuru.html">Mütevelli Olun</a></div>'
      + '</div>';
    mount.outerHTML = nav + mnav;
  })();

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
