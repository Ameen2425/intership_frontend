/**
 * Cognifyz Technologies - Task 04: Interactive Color Playground
 * Controls background color transformations with contrast awareness.
 */

document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_COLOR = '#F4F4F5';

  const presets = [
    { name: 'Warm Terracotta', hex: '#C2593F' },
    { name: 'Forest Green', hex: '#2D5542' },
    { name: 'Cobalt Blue', hex: '#1E40AF' },
    { name: 'Golden Amber', hex: '#D97706' },
    { name: 'Plum Violet', hex: '#6B21A8' },
    { name: 'Slate Teal', hex: '#0F766E' },
    { name: 'Charcoal Ink', hex: '#18181B' },
    { name: 'Alabaster White', hex: '#F4F4F5' }
  ];

  let currentColor = DEFAULT_COLOR;
  const history = [];

  // DOM Elements
  const pageBody = document.getElementById('page-body');
  const activeSwatchPreview = document.getElementById('active-swatch-preview');
  const hexCodeDisplay = document.getElementById('hex-code-display');
  const rgbCodeDisplay = document.getElementById('rgb-code-display');
  const contrastModeDisplay = document.getElementById('contrast-mode-display');
  const randomColorBtn = document.getElementById('random-color-btn');
  const resetColorBtn = document.getElementById('reset-color-btn');
  const copyColorBtn = document.getElementById('copy-color-btn');
  const nativeColorPicker = document.getElementById('native-color-picker');
  const swatchesGrid = document.getElementById('swatches-grid');
  const historyDots = document.getElementById('history-dots');
  const toast = document.getElementById('copied-toast');

  // Convert HEX to RGB
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const intVal = parseInt(hex, 16);
    return {
      r: (intVal >> 16) & 255,
      g: (intVal >> 8) & 255,
      b: intVal & 255
    };
  }

  // Calculate perceived relative luminance
  function calculateLuminance(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Generate random 6-character hex
  function generateRandomHex() {
    const hexChars = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * 16)];
    }
    return hex;
  }

  // Apply color to canvas
  function applyColor(hex, logHistory = true) {
    hex = hex.toUpperCase();
    currentColor = hex;

    pageBody.style.backgroundColor = hex;
    activeSwatchPreview.style.backgroundColor = hex;
    hexCodeDisplay.textContent = hex;

    const { r, g, b } = hexToRgb(hex);
    rgbCodeDisplay.textContent = `rgb(${r}, ${g}, ${b})`;
    nativeColorPicker.value = hex;

    // Contrast check
    const luminance = calculateLuminance(r, g, b);
    if (luminance > 140) {
      contrastModeDisplay.textContent = 'Light Canvas';
      contrastModeDisplay.style.background = '#e4e4e7';
      contrastModeDisplay.style.color = '#27272a';
    } else {
      contrastModeDisplay.textContent = 'Dark Canvas';
      contrastModeDisplay.style.background = '#27272a';
      contrastModeDisplay.style.color = '#f4f4f5';
    }

    if (logHistory) {
      addHistory(hex);
    }
  }

  // Add to session history
  function addHistory(hex) {
    if (history.includes(hex)) {
      history.splice(history.indexOf(hex), 1);
    }
    history.unshift(hex);
    if (history.length > 6) {
      history.pop();
    }
    renderHistory();
  }

  function renderHistory() {
    historyDots.innerHTML = '';
    history.forEach(hex => {
      const dot = document.createElement('button');
      dot.className = 'history-dot';
      dot.style.backgroundColor = hex;
      dot.title = `Switch to ${hex}`;
      dot.setAttribute('aria-label', `Switch to ${hex}`);
      dot.addEventListener('click', () => applyColor(hex, false));
      historyDots.appendChild(dot);
    });
  }

  // Build preset swatches
  presets.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'swatch-btn';
    btn.style.backgroundColor = p.hex;
    btn.title = `${p.name} (${p.hex})`;
    btn.setAttribute('aria-label', `Select ${p.name}`);
    btn.addEventListener('click', () => applyColor(p.hex));
    swatchesGrid.appendChild(btn);
  });

  // Event Listeners
  randomColorBtn.addEventListener('click', () => {
    applyColor(generateRandomHex());
  });

  resetColorBtn.addEventListener('click', () => {
    applyColor(DEFAULT_COLOR);
  });

  nativeColorPicker.addEventListener('input', (e) => {
    applyColor(e.target.value);
  });

  copyColorBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentColor).then(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }).catch(() => {
      prompt('Copy this color code:', currentColor);
    });
  });

  // Initialize
  applyColor(DEFAULT_COLOR, false);
});
