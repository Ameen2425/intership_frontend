/**
 * Cognifyz Technologies - Task 04: Interactive Button
 * Dynamically changes the page background color with contrast adaptation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_COLOR = '#0A0F1D';

  const presetPalettes = [
    { name: 'Cognifyz Navy', hex: '#0A0F1D' },
    { name: 'Cyber Cyan', hex: '#0284C7' },
    { name: 'Royal Indigo', hex: '#4338CA' },
    { name: 'Electric Violet', hex: '#7C3AED' },
    { name: 'Emerald AI', hex: '#059669' },
    { name: 'Amber Glow', hex: '#D97706' },
    { name: 'Crimson Data', hex: '#DC2626' },
    { name: 'Pure Snow', hex: '#F8FAFC' }
  ];

  let currentColor = DEFAULT_COLOR;
  let colorHistory = [];

  // DOM Elements
  const pageBody = document.getElementById('page-body');
  const activeSwatchPreview = document.getElementById('active-swatch-preview');
  const hexCodeDisplay = document.getElementById('hex-code-display');
  const rgbCodeDisplay = document.getElementById('rgb-code-display');
  const contrastModeDisplay = document.getElementById('contrast-mode-display');
  const randomColorBtn = document.getElementById('random-color-btn');
  const resetColorBtn = document.getElementById('reset-color-btn');
  const copyColorBtn = document.getElementById('copy-color-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const nativeColorPicker = document.getElementById('native-color-picker');
  const paletteGrid = document.getElementById('palette-grid');
  const historyPills = document.getElementById('history-pills');
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  // Calculate perceived brightness (ITU-R BT.601) to toggle text contrast
  function calculateLuminance(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  function generateRandomHex() {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function applyColor(hex, saveToHistory = true) {
    hex = hex.toUpperCase();
    currentColor = hex;

    pageBody.style.backgroundColor = hex;

    const { r, g, b } = hexToRgb(hex);
    activeSwatchPreview.style.backgroundColor = hex;
    hexCodeDisplay.textContent = hex;
    rgbCodeDisplay.textContent = `rgb(${r}, ${g}, ${b})`;
    nativeColorPicker.value = hex;

    // Toggle dark or light contrast mode based on background brightness
    const brightness = calculateLuminance(r, g, b);
    if (brightness > 140) {
      pageBody.classList.add('light-theme');
      contrastModeDisplay.textContent = 'Dark Text (Light BG)';
      contrastModeDisplay.style.color = '#0284c7';
      contrastModeDisplay.style.background = 'rgba(2, 132, 199, 0.15)';
    } else {
      pageBody.classList.remove('light-theme');
      contrastModeDisplay.textContent = 'Light Text (Dark BG)';
      contrastModeDisplay.style.color = '#34d399';
      contrastModeDisplay.style.background = 'rgba(16, 185, 129, 0.15)';
    }

    if (saveToHistory) {
      addToHistory(hex);
    }
  }

  function addToHistory(hex) {
    if (colorHistory.length > 0 && colorHistory[0] === hex) return;
    colorHistory.unshift(hex);
    if (colorHistory.length > 8) colorHistory.pop();
    renderHistory();
  }

  function renderHistory() {
    if (colorHistory.length === 0) {
      historyPills.innerHTML = '<span class="history-empty">No colors generated yet.</span>';
      return;
    }

    historyPills.innerHTML = '';
    colorHistory.forEach(hex => {
      const pill = document.createElement('button');
      pill.className = 'history-pill';
      pill.setAttribute('title', `Restore ${hex}`);
      pill.innerHTML = `<span class="history-dot" style="background-color: ${hex};"></span><span>${hex}</span>`;
      pill.addEventListener('click', () => applyColor(hex, false));
      historyPills.appendChild(pill);
    });
  }

  function populatePresetPalettes() {
    paletteGrid.innerHTML = '';
    presetPalettes.forEach(preset => {
      const btn = document.createElement('button');
      btn.className = 'swatch-btn';
      btn.innerHTML = `
        <span class="swatch-circle" style="background-color: ${preset.hex};"></span>
        <span class="swatch-name">${preset.name}</span>
      `;
      btn.addEventListener('click', () => applyColor(preset.hex));
      paletteGrid.appendChild(btn);
    });
  }

  let toastTimer = null;
  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Event Listeners
  randomColorBtn.addEventListener('click', () => {
    applyColor(generateRandomHex());
  });

  resetColorBtn.addEventListener('click', () => {
    applyColor(DEFAULT_COLOR);
    showToast('Reset to Cognifyz Default Navy');
  });

  copyColorBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentColor);
      copyBtnText.textContent = 'Copied!';
      showToast(`Copied ${currentColor} to clipboard!`);
      setTimeout(() => {
        copyBtnText.textContent = 'Copy HEX';
      }, 1500);
    } catch {
      showToast(`Selected: ${currentColor}`);
    }
  });

  nativeColorPicker.addEventListener('input', (e) => {
    applyColor(e.target.value);
  });

  clearHistoryBtn.addEventListener('click', () => {
    colorHistory = [];
    renderHistory();
    showToast('History cleared.');
  });

  // Initialize
  populatePresetPalettes();
  applyColor(DEFAULT_COLOR, false);
});
