export function setupSocialLinks() {
  const socialBtns = document.querySelectorAll('.social-btn[data-link]');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(btn.dataset.link, '_blank', 'noopener,noreferrer');
    });
  });
}
