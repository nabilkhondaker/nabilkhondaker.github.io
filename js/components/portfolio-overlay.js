export function setupPortfolioOverlay() {
  const openBtn = document.getElementById('open-full-portfolio-btn');
  const closeBtn = document.getElementById('close-portfolio-btn');
  const page = document.getElementById('full-portfolio-page');
  const scrollToSimsBtn = document.getElementById('scroll-to-sims-btn');

  if (openBtn && page) {
    openBtn.addEventListener('click', () => {
      page.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && page) {
    closeBtn.addEventListener('click', () => {
      page.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  }

  if (scrollToSimsBtn) {
    scrollToSimsBtn.addEventListener('click', () => {
      const target = document.getElementById('dynamics-sims-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
