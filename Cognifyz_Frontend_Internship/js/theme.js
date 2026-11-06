/**
 * ==========================================================================
 * COGNIFYZ TECHNOLOGIES - FRONT-END DEVELOPMENT INTERNSHIP
 * FILE: js/theme.js
 * ==========================================================================
 */

(function initTheme() {
  const THEME_STORAGE_KEY = 'cognifyz_theme_preference';
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  // Initial apply
  applyTheme(savedTheme);

  // Toggle Listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-theme');
      const nextTheme = isCurrentlyLight ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    });
  }
})();

