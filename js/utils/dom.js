export function setupLoading() {
  const removeLoader = () => {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => loading.remove(), 500);
      }, 1000);
    }
  };

  if (document.readyState === 'complete') {
    removeLoader();
  } else {
    window.addEventListener('load', removeLoader, { passive: true });
  }
}

export function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

export function setupFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
