/* ============================================================
   MAHZIYAR REAL ESTATE MARKETING — interactions
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '923111555426';

  /* ---------- sticky header ---------- */
  var hdr = document.getElementById('hdr');
  var fab = document.getElementById('fab');
  var hint = document.querySelector('.scroll-hint');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (hdr) hdr.classList.toggle('stuck', y > 40);
    if (fab) fab.classList.toggle('show', y > 400);
    if (hint) hint.classList.toggle('gone', y > 120);
    revealBackstop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var scrim = document.getElementById('scrim');
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    if (burger) { burger.classList.remove('on'); burger.setAttribute('aria-expanded', 'false'); }
    if (scrim) scrim.classList.remove('on');
    document.body.style.overflow = '';
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', String(open));
      if (scrim) scrim.classList.toggle('on', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  }
  if (scrim) scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- reveal on scroll ----------
     IntersectionObserver drives the animation. Browsers coalesce scroll events,
     so a fast flick can jump past an element before its callback lands and
     leave it stuck at opacity 0. This backstop sweeps on every animation frame
     while the page is moving, then idles as soon as scrolling stops. */
  var sweeping = false, sweepUntil = 0;
  function sweep() {
    var left = document.querySelectorAll('.rv:not(.in)');
    for (var i = 0; i < left.length; i++) {
      var r = left[i].getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) left[i].classList.add('in');
    }
    if (Date.now() < sweepUntil && document.querySelector('.rv:not(.in)')) {
      requestAnimationFrame(sweep);
    } else {
      sweeping = false;
    }
  }
  function revealBackstop() {
    sweepUntil = Date.now() + 500;
    if (!sweeping) { sweeping = true; requestAnimationFrame(sweep); }
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var group = Array.prototype.slice.call(en.target.parentNode.children).filter(function (n) {
          return n.classList && n.classList.contains('rv');
        });
        var i = group.indexOf(en.target);
        en.target.style.transitionDelay = (i > 0 ? Math.min(i, 5) * 0.08 : 0) + 's';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- seamless ticker (duplicate the track once) ---------- */
  var ticker = document.getElementById('ticker');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }

  /* ---------- "ask about this project" deep-links into the form ---------- */
  var projectSelect = document.getElementById('f-project');
  document.querySelectorAll('.js-ask').forEach(function (link) {
    link.addEventListener('click', function () {
      var name = link.getAttribute('data-project');
      if (!projectSelect || !name) return;
      for (var i = 0; i < projectSelect.options.length; i++) {
        if (projectSelect.options[i].text === name) { projectSelect.selectedIndex = i; break; }
      }
      setTimeout(function () {
        var nameField = document.getElementById('f-name');
        if (nameField) nameField.focus({ preventScroll: true });
      }, 700);
    });
  });

  /* ---------- enquiry form -> prefilled WhatsApp message ---------- */
  var form = document.getElementById('frm');
  var errBox = document.getElementById('err');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name');
      var phone = document.getElementById('f-phone');
      var project = document.getElementById('f-project');
      var budget = document.getElementById('f-budget');
      var msg = document.getElementById('f-msg');

      var bad = false;
      [name, phone].forEach(function (f) {
        var empty = !f.value.trim();
        f.classList.toggle('invalid', empty);
        if (empty) bad = true;
      });
      if (bad) {
        if (errBox) errBox.classList.add('show');
        (name.value.trim() ? phone : name).focus();
        return;
      }
      if (errBox) errBox.classList.remove('show');

      var lines = [
        'Assalam o Alaikum Mahziyar Marketing,',
        '',
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim(),
        'Interested in: ' + project.value,
        'Budget: ' + budget.value
      ];
      if (msg.value.trim()) lines.push('', 'Message: ' + msg.value.trim());
      lines.push('', 'Please share the available options and current payment plan.');

      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('invalid') && e.target.value.trim()) {
        e.target.classList.remove('invalid');
      }
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
