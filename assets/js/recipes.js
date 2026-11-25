(() => {
  document.querySelectorAll('[data-print]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
  try {
    const savedList = sessionStorage.getItem('recipe-list-url');
    if (savedList) {
      const target = new URL(savedList,location.origin);
      if (target.origin === location.origin && target.pathname === '/recipes/') {
        document.querySelectorAll('[data-recipe-return]').forEach(link => {
          link.href = target.pathname + target.search;
        });
      }
    }
  } catch { /* The ordinary recipe index remains the fallback destination. */ }

  const checks = [...document.querySelectorAll('[data-ingredient-check]')];
  if (checks.length) {
    const tools = document.querySelector('[data-ingredient-tools]');
    const clear = document.querySelector('[data-clear-ingredients]');
    const status = document.querySelector('[data-ingredient-status]');
    const names = checks.map(check => check.closest('label').textContent);
    const storageKey = 'recipe-ingredients:' + location.pathname;
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved && JSON.stringify(saved.names) === JSON.stringify(names) && Array.isArray(saved.checked)) {
        checks.forEach((check,index) => { check.checked = saved.checked.includes(index); });
      }
    } catch { /* The checklist also works when storage is unavailable. */ }
    function updateIngredients() {
      const checked = checks.flatMap((check,index) => check.checked ? [index] : []);
      clear.disabled = checked.length === 0;
      status.textContent = checked.length + ' / ' + checks.length + '品の材料を準備しました';
      try { sessionStorage.setItem(storageKey,JSON.stringify({names,checked})); } catch { /* No persistence required. */ }
    }
    tools.hidden = false;
    status.hidden = false;
    checks.forEach(check => check.addEventListener('change',updateIngredients));
    clear.addEventListener('click',() => {
      checks.forEach(check => { check.checked = false; });
      updateIngredients();
    });
    updateIngredients();
  }

  const navigation = document.querySelector('[data-recipe-nav]');
  if (navigation) {
    const links = [...navigation.querySelectorAll('a[href^="#"]')];
    const sections = links.map(link => document.getElementById(link.hash.slice(1)));
    let pending = false;
    function updateLocation() {
      pending = false;
      const edge = navigation.getBoundingClientRect().bottom + 28;
      let active = 0;
      sections.forEach((section,index) => { if (section.getBoundingClientRect().top <= edge) active = index; });
      links.forEach((link,index) => {
        if (index === active) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
    function scheduleLocation() {
      if (!pending) { pending = true; requestAnimationFrame(updateLocation); }
    }
    window.addEventListener('scroll',scheduleLocation,{passive:true});
    window.addEventListener('resize',scheduleLocation);
    updateLocation();
  }

  const controls = document.querySelector('[data-recipe-controls]');
  if (!controls) return;
  const form = controls.querySelector('form');
  const input = controls.querySelector('input');
  const reset = controls.querySelector('[type="reset"]');
  const buttons = [...controls.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-recipe-list] .recipe-card')];
  const count = document.querySelector('[data-recipe-count]');
  const empty = document.querySelector('[data-recipe-empty]');
  let category = 'all';
  const normalize = value => value.normalize('NFKC').toLowerCase().replace(/ご飯/g,'ごはん').trim();
  function update(saveUrl=true) {
    const query = normalize(input.value);
    const terms = query.split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const keywords = normalize(card.dataset.keywords);
      const matchesQuery = terms.every(term => keywords.includes(term));
      card.hidden = !(matchesCategory && matchesQuery);
      if (!card.hidden) visible++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
    count.textContent = visible + '件のレシピ' + (query || category !== 'all' ? '（全' + cards.length + '件）' : '');
    empty.hidden = visible !== 0;
    reset.disabled = !query && category === 'all';
    if (saveUrl) {
      const next = new URL(location.href);
      if (input.value.trim()) next.searchParams.set('q',input.value.trim());
      else next.searchParams.delete('q');
      if (category !== 'all') next.searchParams.set('category',category);
      else next.searchParams.delete('category');
      history.replaceState(null,'',next);
    }
    try { sessionStorage.setItem('recipe-list-url',location.pathname + location.search); } catch { /* URL state still works. */ }
  }
  function restore() {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    const selected = params.get('category');
    category = buttons.some(button => button.dataset.filter === selected) ? selected : 'all';
    update(false);
  }
  controls.hidden = false;
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('reset',()=>{input.value='';category='all';update();input.focus();});
  input.addEventListener('input',()=>update());
  buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;update();}));
  window.addEventListener('popstate',restore);
  window.addEventListener('pageshow',restore);
  restore();
})();
