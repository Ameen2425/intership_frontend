# Cognifyz Technologies &mdash; Front-End Development Internship Showcase

[![Cognifyz Technologies](https://img.shields.io/badge/Brand-Cognifyz%20Technologies-0284c7?style=for-the-badge)](https://cognifyz.com)
[![Internship Track](https://img.shields.io/badge/Track-Frontend%20Development-6366f1?style=for-the-badge)](https://cognifyz.com)
[![Status](https://img.shields.io/badge/Status-100%25%20Completed-10b981?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20%7C%20Bootstrap%20%7C%20Sass-38bdf8?style=for-the-badge)](#)

> **"Where Data Meets Intelligence"**  
> *A production-grade, 8-task interactive frontend development showcase engineered for internship evaluation and professional portfolio presentation.*

---

## 🌟 Project Overview

This repository represents the completed **Front-End Development Internship Project** assigned by **Cognifyz Technologies**. Engineered by adopting senior frontend development, UI/UX design, and software architecture standards, this showcase delivers:

- **1 Master Showcase Portal:** A modern SaaS-style landing page with dark/light theme switching, responsive navigation, dynamic task filtering, animated counters, and interactive modals.
- **8 Dedicated Task Implementations:** Every task maintained in its own dedicated directory with working code, responsive design, and individual `README.md` documentation.
- **Pure Web Standards Foundation:** Built strictly using vanilla HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Dart Sass, and REST APIs without third-party JS frameworks (such as React or Vue).

---

## 🏛️ Project Directory Structure

```text
Cognifyz_Frontend_Internship/
│
├── index.html                           # Master Showcase Landing Page
├── README.md                            # Primary Project Documentation
├── package.json                         # Build configurations & dependencies
├── .gitignore                           # Git version control exclusions
│
├── assets/
│   ├── images/
│   │   ├── hero-illustration.svg        # Vector tech visualization
│   │   └── about-illustration.svg       # Cognifyz ecosystem diagram
│   ├── icons/
│   │   ├── cognifyz-logo.svg            # Official vector logo
│   │   ├── favicon.svg                  # Browser tab icon
│   │   ├── html5.svg                    # Tech icon
│   │   ├── css3.svg                     # Tech icon
│   │   ├── javascript.svg               # Tech icon
│   │   ├── bootstrap.svg                # Tech icon
│   │   ├── sass.svg                     # Tech icon
│   │   └── api.svg                      # Tech icon
│   └── fonts/                           # Google Fonts & Icons CDN mapped
│
├── css/
│   ├── main.css                         # Design system tokens, SaaS styling, themes
│   └── responsive.css                   # Mobile, tablet, laptop media queries
│
├── js/
│   ├── main.js                          # Task filters, stats animations, contact modal
│   ├── navigation.js                    # Mobile drawer, scroll spy active links
│   └── theme.js                         # Dark / Light theme engine with localStorage
│
├── tasks/
│   ├── level-1/
│   │   ├── task-01-basic-html/          # LEVEL 1: Semantic HTML5 Architecture
│   │   │   ├── index.html
│   │   │   └── README.md
│   │   └── task-02-inline-css/          # LEVEL 1: Inline CSS & Specificity (1,0,0,0)
│   │       ├── index.html
│   │       └── README.md
│   │
│   ├── level-2/
│   │   ├── task-03-responsive-design/   # LEVEL 2: 4-Tier Breakpoints, Zero Overflow
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   └── README.md
│   │   └── task-04-interactive-button/  # LEVEL 2: Dynamic State, Contrast, Web Audio
│   │       ├── index.html
│   │       ├── styles.css
│   │       ├── script.js
│   │       └── README.md
│   │
│   ├── level-3/
│   │   ├── task-05-api-integration/     # LEVEL 3: Fetch REST API, Skeleton UX, Modals
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── script.js
│   │   │   └── README.md
│   │   └── task-06-form-validation/     # LEVEL 3: Regex Validation, Entropy Meter
│   │       ├── index.html
│   │       ├── styles.css
│   │       ├── script.js
│   │       └── README.md
│   │
│   └── level-4/
│       ├── task-07-component-styling/   # LEVEL 4: Bootstrap 5 Component System
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── README.md
│       └── task-08-sass-preprocessing/  # LEVEL 4: Modular Sass Architecture
│           ├── index.html
│           ├── scss/
│           │   ├── styles.scss          # Main manifest
│           │   ├── _variables.scss      # Design tokens
│           │   ├── _mixins.scss         # Functions & mixins
│           │   └── _components.scss     # BEM components
│           ├── css/
│           │   ├── styles.css           # Compiled CSS output
│           │   └── styles.css.map       # Source map
│           └── README.md
│
└── documentation/
    ├── internship-overview.md           # Company background & curriculum
    ├── task-completion-checklist.md     # Granular verification matrix
    └── testing-guide.md                 # QA instructions & browser matrix
```

---

## 📋 The 8 Internship Tasks At a Glance

| Task | Level | Title & Objective | Key Technical Highlights |
| :---: | :---: | :--- | :--- |
| **01** | Level 1 (Beginner) | **Basic HTML Page Architecture** | Semantic HTML5 structure, H1-H6 hierarchy, accessible tables, figures, native details/summary disclosures, and educational comments. |
| **02** | Level 1 (Beginner) | **Inline CSS Styling Demonstration** | Pure inline CSS declarations (`style=""`), typography, gradients, flexbox containers, and explanation of `(1,0,0,0)` specificity. |
| **03** | Level 2 (Intermediate) | **Fluid Responsive Design** | 4 responsive tiers (Mobile, Tablet, Laptop, Desktop), zero horizontal overflow, pure CSS hamburger drawer, and live breakpoint indicator. |
| **04** | Level 2 (Intermediate) | **Interactive Button & Dynamic State** | Real-time DOM color manipulation, curated Cognifyz themes, native color picker, luminance contrast adaptation, and procedural Web Audio clicks. |
| **05** | Level 3 (Advanced) | **Public REST API Integration** | Async/await Fetch API integration with JSONPlaceholder, skeleton loading UX, live search filter, pagination, latency tracking, and comment threads. |
| **06** | Level 3 (Advanced) | **Form Styling & Client Validation** | Real-time regex validation on input/blur, 4-tier password entropy bar, password visibility peek, character counter, and submission summary modal. |
| **07** | Level 4 (Expert) | **Component-Based Styling (Bootstrap 5)** | Elevated Bootstrap 5 theme, 12-column grid, interactive modals, tabs, accordions, tooltips, popovers, and toast notifications. |
| **08** | Level 4 (Expert) | **CSS Preprocessing with Sass (SCSS)** | Modular SCSS partials, design tokens, mathematical functions, glassmorphic mixins, BEM nesting, and automated Dart Sass build scripts. |

---

## 🚀 How to Run the Project Locally

No complicated database or server configuration is required. You can serve the project using Python or Node.js:

### Option 1: Using Python (Instant, No Installation Required)
```bash
# Navigate to the project root
cd Cognifyz_Frontend_Internship

# Launch static HTTP server
python -m http.server 3000
```
Open your browser and navigate to: **`http://localhost:3000`**

### Option 2: Using Node / NPM
```bash
# Install dependencies
npm install

# Start local server
npm start
```

---

## 🎨 How to Compile and Watch Sass

The project uses modern **Dart Sass**. Compilation scripts are configured in `package.json`:

```bash
# Compile SCSS partials to expanded CSS with source maps:
npm run build:sass

# Compile minified production CSS:
npm run build:sass:min

# Start live file watcher for active SCSS development:
npm run watch:sass
```

The pre-compiled `css/styles.css` file is included and verified out-of-the-box so the project operates immediately without needing a build step.

---

## 🧪 Quality Assurance & Verification

Before submitting, the project was audited against the following standards:
- [x] All 8 task directories exist and operate independently.
- [x] Zero broken links, 404 assets, or missing icons.
- [x] Zero browser console errors.
- [x] Strict WAI-ARIA and accessibility compliance.
- [x] Responsive layout verified from 320px mobile screens to 1440px widescreen displays.
- [x] Error handling tested and verified via the "Simulate Error" API tester.
- [x] Full Dark / Light mode switching with `localStorage` state persistence.

---

## 👥 About Cognifyz Technologies

**Cognifyz Technologies** is a leading technology solutions provider specializing in **Data Science, Artificial Intelligence, Machine Learning, and Big Data Analytics**. 

- **Website:** [cognifyz.com](https://cognifyz.com)
- **Tagline:** Where Data Meets Intelligence
- **Focus:** Enterprise Solutions & Technology Talent Incubation

---

## 📄 License
This project is developed as an official internship submission for **Cognifyz Technologies** and is distributed under the **MIT License**.

