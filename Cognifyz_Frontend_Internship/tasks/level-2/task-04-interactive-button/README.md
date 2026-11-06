# Task 04: Interactive Button & State Engine

**Internship Track:** Cognifyz Technologies Front-End Development Internship  
**Level:** Level 2 — Intermediate  
**Directory:** `tasks/level-2/task-04-interactive-button/`  

---

## Task Overview
This project demonstrates dynamic state manipulation and event handling using JavaScript ES6+. Clicking buttons dynamically generates random colors, selects curated brand palettes, updates the page background, recalculates accessible text contrast, and maintains a session color history.

## Technologies Used
- HTML5
- CSS3 (Smooth transitions & theme inversion)
- JavaScript ES6+ (DOM Events, Color Math, Clipboard API)

## Key Features Implemented
1. **Random Hex Color Generator:** Synthesizes randomized 24-bit hexadecimal codes.
2. **Curated Cognifyz Palettes:** Instant preset selection across 8 theme colors.
3. **Contrast Luminance Algorithm:** ITU-R BT.601 formula ensuring WCAG text readability on light and dark backgrounds.
4. **Copy to Clipboard:** Native `navigator.clipboard.writeText` integration with toast notification.
5. **Interactive History:** Clickable session history pills restoring previously selected colors.
6. **Reset Controller:** Restores the default Cognifyz dark navy theme.

## Files
- `index.html` - Evaluator & Task Explanation page with live demonstration.
- `demo.html` - Standalone interactive button webpage.
- `styles.css` - Stylesheet for smooth background transitions and themes.
- `script.js` - JavaScript event handling and state logic.

## How to Test
1. Open `index.html` to review documentation and embedded demo.
2. Click **"Open Standalone Demo ↗"**.
3. Click "Generate Random Color", test preset swatches, click "Copy HEX", and test "Reset to Default".
