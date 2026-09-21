export function setupThemePicker() {
  const themeBtn = document.getElementById('theme-btn');
  const themePanel = document.getElementById('theme-panel');
  const themeCloseBtn = document.getElementById('theme-panel-close');
  const colorPicker = document.getElementById('color-picker');
  const colorPreview = document.querySelector('.color-preview-circle');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const root = document.documentElement;

  const themes = {
    gold: { accent: '#913700', secondary: '#ffe600', bg: '#0a0a0b' },
    cyber: { accent: '#ff0055', secondary: '#00ffcc', bg: '#05000a' },
    toxic: { accent: '#0d5f00', secondary: '#00ff66', bg: '#000501' },
    cosmic: { accent: '#4d0099', secondary: '#00ffff', bg: '#02000a' },
    crimson: { accent: '#910000', secondary: '#ff4d4d', bg: '#0a0000' }
  };

  let isUpdating = false;

  const applyThemeStyles = (accentColor, secondaryColor, backgroundColor = '#0a0a0b', skipInputUpdate = false) => {
    if (isUpdating) return;
    isUpdating = true;

    root.style.setProperty('--accent', accentColor);
    root.style.setProperty('--accent-blue', secondaryColor);
    root.style.setProperty('--bg-primary', backgroundColor);

    if (colorPreview) colorPreview.style.background = accentColor;

    if (colorPicker && !skipInputUpdate) {
      colorPicker.value = accentColor;
    }

    const cleanHex = accentColor.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness > 165) {
      root.style.setProperty('--text-primary', '#111112');
      root.style.setProperty('--text-secondary', '#333336');
      root.style.setProperty('--border', 'rgba(0, 0, 0, 0.15)');
    } else {
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--border', 'rgba(255, 255, 255, 0.08)');
    }

    isUpdating = false;
  };

  if (themeBtn && themePanel) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themePanel.classList.toggle('hidden');
    });
  }

  if (themeCloseBtn && themePanel) {
    themeCloseBtn.addEventListener('click', () => {
      themePanel.classList.add('hidden');
    });
  }

  document.addEventListener('click', (e) => {
    if (themePanel && themeBtn && !themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
      themePanel.classList.add('hidden');
    }
  }, { passive: true });

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetName = btn.dataset.theme;
      const config = themes[targetName];

      if (config) {
        applyThemeStyles(config.accent, config.secondary, config.bg, false);
        localStorage.setItem('site-theme-custom', JSON.stringify(config));
      }
    });
  });

  if (colorPicker) {
    let rafTimeout;
    colorPicker.addEventListener('input', (e) => {
      presetButtons.forEach(b => b.classList.remove('active'));

      const customAccent = e.target.value;
      const customSecondary = '#ffffff';

      if (rafTimeout) cancelAnimationFrame(rafTimeout);

      rafTimeout = requestAnimationFrame(() => {
        applyThemeStyles(customAccent, customSecondary, '#0a0a0b', true);
        localStorage.setItem('site-theme-custom', JSON.stringify({
          accent: customAccent,
          secondary: customSecondary,
          bg: '#0a0a0b'
        }));
      });
    });
  }

  const savedCustomConfig = localStorage.getItem('site-theme-custom');
  if (savedCustomConfig) {
    try {
      const parsed = JSON.parse(savedCustomConfig);
      applyThemeStyles(parsed.accent, parsed.secondary, parsed.bg, false);

      presetButtons.forEach(b => {
        if (themes[b.dataset.theme]?.accent === parsed.accent) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    } catch (e) {
      console.error('Theme configuration mapping issue on startup:', e);
    }
  }
}
