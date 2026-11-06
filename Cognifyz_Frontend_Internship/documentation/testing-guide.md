# Cognifyz Technologies &mdash; Quality Assurance & Testing Guide

This testing guide provides step-by-step instructions to verify, audit, and evaluate all 8 task implementations and the main landing page portal.

---

## 1. Local Development Server Setup

You can run the showcase using any local static web server. Navigate to the project root:

```bash
cd Cognifyz_Frontend_Internship
```

### Option A: Using Python (Pre-installed)
```bash
python -m http.server 3000
```
Open your browser and navigate to: **`http://localhost:3000`**

### Option B: Using NPM Scripts
```bash
npm start
```
Or with `npx serve`:
```bash
npm run serve
```

---

## 2. Main Portal Testing Checklist

1. **Theme Switcher:**
   - Click the theme toggle button (moon/sun icon) in the top-right navbar.
   - Verify that the background smoothly transitions between dark navy (`#070b14`) and clean light mode (`#f8fafc`).
   - Refresh the page and confirm that `localStorage` preserves your theme preference.

2. **Mobile Navigation Drawer:**
   - Open DevTools (`F12`), toggle Device Toolbar (`Ctrl + Shift + M`), and select an iPhone/Pixel viewport width (`< 768px`).
   - Verify that the navigation links collapse into the hamburger icon.
   - Tap the hamburger icon to toggle the animated drawer open and closed.
   - Tap any link to verify that the menu automatically dismisses.

3. **Task Showcase Filtering:**
   - Click **"Level 1: Beginner"** &rarr; Verify only Task 01 and Task 02 display.
   - Click **"Level 2: Intermediate"** &rarr; Verify only Task 03 and Task 04 display.
   - Click **"Level 3: Advanced"** &rarr; Verify only Task 05 and Task 06 display.
   - Click **"Level 4: Expert"** &rarr; Verify only Task 07 and Task 08 display.
   - Click **"All Tasks (8)"** &rarr; Verify all 8 tasks reappear smoothly.

4. **Task Navigation Links:**
   - Click **"Open Task &rarr;"** on each of the 8 cards to ensure no broken 404 links occur.

5. **Contact / Feedback Modal:**
   - Click the email icon in the footer or social bar.
   - Fill out the form and submit. Verify that the submission triggers the toast alert without reloading the page.

---

## 3. Individual Task Verification Suites

### Task 01: Basic HTML Page
- **Path:** `tasks/level-1/task-01-basic-html/index.html`
- **Tests:**
  1. Verify the semantic heading outline in Developer Tools (`h1` through `h6`).
  2. Test native `<details>`/`<summary>` elements by clicking to expand and collapse without JavaScript.
  3. Inspect table semantics (`caption`, `th scope="col"`, `th scope="row"`).
  4. Click the return ribbon link to navigate back to the main portal.

### Task 02: Inline CSS Styling
- **Path:** `tasks/level-1/task-02-inline-css/index.html`
- **Tests:**
  1. Inspect the source code and verify that no `<link rel="stylesheet">` or internal `<style>` tags exist in `<head>`.
  2. Verify that all typography, gradients, flexbox alignments, borders, and shadows are defined inside `style="..."` attributes.
  3. Compare the unstyled default box next to the styled element.

### Task 03: Responsive Design
- **Path:** `tasks/level-2/task-03-responsive-design/index.html`
- **Tests:**
  1. Open Developer Tools and drag the viewport slider from 320px to 1440px.
  2. Verify that the floating badge in the bottom-right corner automatically updates:
     - `< 576px`: `Mobile XS (<576px)`
     - `576px - 768px`: `Tablet MD (576px - 768px)`
     - `769px - 1024px`: `Laptop LG (769px - 1024px)`
     - `> 1024px`: `Desktop XL (>1024px)`
  3. Confirm there is zero horizontal scrollbar overflow at any width.
  4. On mobile screens, tap the pure CSS hamburger to expand the drawer.

### Task 04: Interactive Button
- **Path:** `tasks/level-2/task-04-interactive-button/index.html`
- **Tests:**
  1. Click **"Generate Random Color"** &rarr; Observe background change, hex/RGB monitor update, and Web Audio synthesizer click tone.
  2. Select bright colors (e.g. Pure Snow `#f8fafc` or Yellow) &rarr; Verify that the luminance algorithm dynamically flips the text and cards to dark contrast mode for accessibility.
  3. Click **"Copy HEX"** &rarr; Verify the toast alert and paste into a text editor to confirm the clipboard contents.
  4. Click any color from the session history pills to restore that color.
  5. Click **"Reset to Default"** &rarr; Verify smooth easing restoration of the Cognifyz default navy theme.

### Task 05: Public REST API Integration
- **Path:** `tasks/level-3/task-05-api-integration/index.html`
- **Tests:**
  1. On initial load, verify the animated skeleton shimmer cards appearing before the 100 posts render.
  2. Check the latency monitor (displays live round-trip time in milliseconds).
  3. Type keywords into the search bar (e.g., "qui" or "architecto") &rarr; Verify instant live filtering.
  4. Select an author from the Author dropdown &rarr; Verify only posts from that user ID display.
  5. Test pagination by clicking "Next" and "Previous".
  6. Click **"View Discussion & Comments"** on any card &rarr; Verify modal opens and fetches live comments from `/posts/{id}/comments`.
  7. Click **"Simulate Error"** &rarr; Verify error notice displays with retry button. Click **"Retry Connection"** to verify recovery.

### Task 06: Form Styling and Validation
- **Path:** `tasks/level-3/task-06-form-validation/index.html`
- **Tests:**
  1. Click **"Submit Application"** immediately &rarr; Verify all required fields show red error borders, error icons, and error messages.
  2. Type into the Password field &rarr; Observe the 4-tier strength bar updating in real time (Weak &rarr; Fair &rarr; Good &rarr; Excellent).
  3. Click the eye toggle icon next to password inputs to unmask and mask characters.
  4. Type into the message field &rarr; Verify live character counter increments up to 500 characters.
  5. Enter valid data across all fields and submit &rarr; Verify the success modal dialog pops up showing a formatted summary of the submitted payload.

### Task 07: Component-Based Styling (Bootstrap 5)
- **Path:** `tasks/level-4/task-07-component-styling/index.html`
- **Tests:**
  1. Test the responsive Bootstrap navbar and dropdown menu.
  2. Click **"Launch Interactive Modal"** &rarr; Verify Bootstrap modal opens with focus trapping.
  3. Click through the Curriculum Tabs &rarr; Verify instant pane switching without page reloads.
  4. Expand and collapse the FAQ Accordion items.
  5. Click **"Trigger Toast"** &rarr; Verify Bootstrap toast alert pops up in the bottom-right corner.

### Task 08: CSS Preprocessing with Sass
- **Path:** `tasks/level-4/task-08-sass-preprocessing/index.html`
- **Tests:**
  1. Verify the page styles load properly from `css/styles.css`.
  2. Inspect `scss/_variables.scss`, `scss/_mixins.scss`, and `scss/_components.scss`.
  3. Test compilation command in terminal:
     ```bash
     npm run build:sass
     ```
  4. Confirm that the command exits with code 0 and updates `css/styles.css`.

---

## 4. Browser Compatibility Matrix

This project has been tested and certified across modern evergreen browsers:
- **Google Chrome / Chromium:** v110+ (Fully Supported)
- **Mozilla Firefox:** v110+ (Fully Supported)
- **Microsoft Edge:** v110+ (Fully Supported)
- **Apple Safari / iOS Safari:** v16+ (Fully Supported)

