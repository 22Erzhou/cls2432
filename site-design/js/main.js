/* Er的技术博客 — 全站交互脚本 */
(function () {
  'use strict';

  /* 移动端菜单 */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });
    // 点击链接后自动收起
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* 作品集筛选 */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var workCards = document.querySelectorAll('#portfolioGrid .work-card');
  var emptyTip = document.getElementById('emptyTip');
  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        var visible = 0;
        workCards.forEach(function (card) {
          var match = f === 'all' || card.getAttribute('data-category') === f;
          card.style.display = match ? '' : 'none';
          if (match) visible++;
        });
        if (emptyTip) emptyTip.hidden = visible > 0;
      });
    });
  }

  /* 联系表单校验与本地反馈 */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['name', 'email', 'message'].forEach(function (id) {
        var field = document.getElementById(id);
        if (!field) return;
        var bad = !field.value.trim() || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
        field.style.borderColor = bad ? '#f87171' : '';
        if (bad) valid = false;
      });
      var tip = document.getElementById('formSuccess');
      if (valid) {
        form.reset();
        if (tip) tip.hidden = false;
        setTimeout(function () { if (tip) tip.hidden = true; }, 6000);
      }
    });
  }
})();
