# Task 08: Modular CSS Preprocessing with Sass (SCSS)

**Internship Track:** Cognifyz Technologies Front-End Development Internship  
**Level:** Level 4 — Expert  
**Directory:** `tasks/level-4/task-08-sass-preprocessing/`  

---

## Task Overview
This project demonstrates modern CSS preprocessing using Dart Sass (SCSS). It establishes a modular stylesheet architecture with partials (`_variables.scss`, `_mixins.scss`, `_components.scss`), design tokens, mathematical functions, parametric mixins, BEM nesting, and automated build and watch scripts configured via `package.json`.

## Technologies Used
- Dart Sass (v1.77+)
- SCSS Syntax (`@use`, `@mixin`, `@function`, `&`)
- Node.js & NPM Scripts (`package.json`)
- HTML5

## Key Features Implemented
1. **Design Tokens (`_variables.scss`):** Centralized colors, typography scales, spacing units, and responsive breakpoint maps.
2. **Parametric Mixins & Math (`_mixins.scss`):** Glassmorphism mixin, `to-rem()` conversion, and responsive media query maps.
3. **BEM Component Styling (`_components.scss`):** Scoped component rules using the parent `&` selector.
4. **Dart Sass Compilation:** Compiles `scss/styles.scss` into `css/styles.css` with development source maps.
5. **NPM Build Scripts:** Commands for compiling (`npm run build:sass`), minifying (`npm run build:sass:min`), and live watching (`npm run watch:sass`).

## Files
- `index.html` - Evaluator & Task Explanation page with live demonstration.
- `demo.html` - Standalone page linked to compiled `css/styles.css`.
- `scss/styles.scss` - Main SCSS manifest importing all partials.
- `scss/_variables.scss` - Design tokens and variables.
- `scss/_mixins.scss` - Functions, mixins, and responsive maps.
- `scss/_components.scss` - BEM component stylesheets.
- `css/styles.css` - Compiled production CSS.

## How to Test & Compile
1. Open `index.html` to review documentation and embedded demo.
2. Click **"Open Standalone Demo ↗"**.
3. Compile SCSS from the project root (`Cognifyz_Frontend_Internship/`):
   ```bash
   npm run build:sass
   ```
4. Verify that Dart Sass compiles with exit code 0.
