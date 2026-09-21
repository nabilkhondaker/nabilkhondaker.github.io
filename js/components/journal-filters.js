export function setupJournalFilters() {
  const filterBtns = document.querySelectorAll('.journal-filter-btn');
  const entries = document.querySelectorAll('.journal-entry');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag || 'all';

      entries.forEach(entry => {
        if (tag === 'all' || entry.dataset.tags?.includes(tag)) {
          entry.style.display = '';
        } else {
          entry.style.display = 'none';
        }
      });
    });
  });
}
