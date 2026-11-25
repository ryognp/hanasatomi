(() => {
  document.querySelectorAll('[data-print]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
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
  const normalize = value => value.normalize('NFKC').toLowerCase().trim();
  function update() {
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
    count.textContent = visible + '件のレシピ';
    empty.hidden = visible !== 0;
    reset.disabled = !query && category === 'all';
  }
  controls.hidden = false;
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('reset',()=>{input.value='';category='all';update();input.focus();});
  input.addEventListener('input',update);
  buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;update();}));
  update();
})();
