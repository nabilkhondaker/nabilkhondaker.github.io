import { Portfolio } from './portfolio.js';
import { initToolbox } from './pages/toolbox.js';
import { initGlossary } from './pages/glossary.js';
import { initTrivia } from './pages/trivia.js';
import { loadProjects } from './data/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
  loadProjects();

  // keep the original window helpers so sidebar clicks still work
  window.initToolbox = initToolbox;
  window.initGlossary = initGlossary;
  window.initTrivia = initTrivia;
});
