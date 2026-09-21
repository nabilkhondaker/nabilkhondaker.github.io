export function setupSidebarAndRightPages() {
  const trigger = document.getElementById('sidebar-trigger');
  const sidebar = document.getElementById('vs-sidebar');
  const backdrop = document.getElementById('vs-sidebar-backdrop');
  const closeBtn = document.getElementById('vs-sidebar-close');

  const openSidebar = () => {
    sidebar?.classList.add('open');
    backdrop?.classList.add('open');
  };

  const closeSidebar = () => {
    sidebar?.classList.remove('open');
    backdrop?.classList.remove('open');
  };

  if (trigger) trigger.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // right-page openers
  document.querySelectorAll('.vs-sidebar-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.dataset.page;
      const page = document.getElementById(`page-${pageId}`);
      if (page) {
        page.classList.add('open');
        closeSidebar();
        document.body.style.overflow = 'hidden';

        // bootstrap heavy pages
        if (pageId === 'glossary' && window.initGlossary) window.initGlossary();
        if (pageId === 'trivia' && window.initTrivia) window.initTrivia();
        if (pageId === 'toolbox' && window.initToolbox) window.initToolbox();
      }
    });
  });

  // close buttons for all right pages
  document.querySelectorAll('.close-right-page').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.closest('.page-overlay-right');
      if (page) {
        page.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  });
}
