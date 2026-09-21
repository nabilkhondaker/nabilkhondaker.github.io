export function setupOverviewModal() {
  const modal = document.getElementById('overview-modal');
  const closeBtn = document.getElementById('overview-close-btn');
  const titleEl = document.getElementById('overview-title');
  const summaryEl = document.getElementById('overview-summary');
  const whyEl = document.getElementById('overview-why');
  const learnedEl = document.getElementById('overview-learned');
  const challengesEl = document.getElementById('overview-challenges');

  window.openOverviewModal = (title, summary, why, learned, challenges) => {
    if (!modal) return;
    titleEl.textContent = title.replace(/<[^>]*>/g, '');
    summaryEl.textContent = summary;
    whyEl.textContent = why;
    learnedEl.textContent = learned;
    challengesEl.textContent = challenges;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
}
