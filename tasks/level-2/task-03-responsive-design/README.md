# Task 03: Fluid Responsive Architecture & Media Queries

**Internship Track:** Cognifyz Technologies Front-End Development Internship  
**Level:** Level 2 — Intermediate  
**Directory:** `tasks/level-2/task-03-responsive-design/`  

---

## Task Overview
This project demonstrates responsive web design using an external `styles.css` file and CSS media queries. The layout adapts dynamically across four breakpoint tiers (Mobile, Tablet, Laptop, and Desktop) while guaranteeing zero horizontal scroll overflow.

## Technologies Used
- HTML5
- External CSS3 (`styles.css`)
- CSS Media Queries (`@media`)
- CSS Grid & Flexbox
- Viewport Units & Typography Scaling (`clamp()`)

## Key Features Implemented
1. **4-Tier Responsive Breakpoints:**
   - Mobile: `< 576px`
   - Tablet: `576px – 768px`
   - Laptop: `769px – 1024px`
   - Desktop: `> 1024px`
2. **Column Reordering:** CSS Grid reflowing from 4 columns to 2 to 1 without duplicated markup.
3. **Pure CSS Mobile Drawer:** Checkbox toggle mechanism managing navigation visibility on mobile devices.
4. **Adaptive Table:** Horizontal scroll container protecting the viewport from wide tabular layouts.
5. **Live Breakpoint Indicator:** A dynamic badge in the bottom-right corner reflecting the active screen tier.

## Files
- `index.html` - Evaluator & Task Explanation page with live demonstration.
- `demo.html` - Standalone responsive webpage.
- `styles.css` - External stylesheet containing media query rules.

## How to Test
1. Open `index.html` to review documentation and embedded demo.
2. Click **"Open Standalone Demo ↗"** and open Developer Tools (`F12`).
3. Press `Ctrl + Shift + M` to toggle Device Toolbar and resize the viewport across different screen dimensions.
