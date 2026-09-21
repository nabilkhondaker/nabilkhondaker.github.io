import { setupLoading, setupScrollAnimations, setupFooterYear } from './utils/dom.js';
import { setupThemePicker } from './components/theme.js';
import { setupClock } from './components/clock.js';
import { setupSocialLinks } from './components/social.js';
import { setupEmailCopy } from './components/email-copy.js';
import { setupWikiViewer } from './components/wiki.js';
import { setupSimulations } from './components/simulations.js';
import { setupPortfolioOverlay } from './components/portfolio-overlay.js';
import { setupOverviewModal } from './components/overview-modal.js';
import { setupSidebarAndRightPages } from './components/sidebar.js';
import { setupAchievementsGallery } from './components/achievements-gallery.js';
import { setupJournalFilters } from './components/journal-filters.js';
import { setupNabilaiChatbot } from './components/nabilai-chatbot.js';

export class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    setupLoading();
    setupSocialLinks();
    setupScrollAnimations();
    setupFooterYear();
    setupClock();
    setupEmailCopy();
    setupThemePicker();
    setupWikiViewer();
    setupSimulations();
    setupPortfolioOverlay();
    setupOverviewModal();
    setupSidebarAndRightPages();
    setupAchievementsGallery();
    setupJournalFilters();
    setupNabilaiChatbot();
  }
}
