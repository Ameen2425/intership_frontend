# GitHub Pages Deployment Guide

This project is configured and ready to deploy directly to **GitHub Pages** (`https://<username>.github.io/<repository-name>/`).

---

## Why This Project is 100% GitHub Pages Compatible

1. **Pure Relative Path Architecture:**
   All links, scripts, stylesheets, and assets use relative paths (e.g., `css/main.css`, `tasks/level-1/...`) rather than root-slashed paths (`/css/...`). This ensures zero broken links whether deployed to a custom domain root (`username.github.io/`) or a repository subpath (`username.github.io/repository-name/`).

2. **Jekyll Processing Bypassed (`.nojekyll`):**
   An empty `.nojekyll` file is included in the project root. This instructs GitHub Pages to bypass Jekyll processing, ensuring SCSS partial files starting with an underscore (`_variables.scss`, `_mixins.scss`) in Task 8 are preserved and not stripped.

3. **Pre-configured GitHub Actions (`.github/workflows/deploy.yml`):**
   An automated deployment workflow using the official GitHub Pages Actions is included. Every push to `main` or `master` will automatically build and publish your site.

---

## Step-by-Step Deployment Instructions

### Step 1: Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com/).
2. Click the **+** icon in the top right and select **New repository**.
3. Name your repository (e.g., `Cognifyz_Frontend_Internship` or `cognifyz-internship`).
4. Choose **Public** (recommended for GitHub Pages on free accounts).
5. Do **not** initialize with a README, .gitignore, or license (these already exist in the project).
6. Click **Create repository**.

---

### Step 2: Initialize Git and Push Your Project

Open PowerShell in the `Cognifyz_Frontend_Internship` folder:

```powershell
# Navigate into the project folder
cd "c:\Users\user\Desktop\New folder\Cognifyz_Frontend_Internship"

# Initialize local git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "feat: complete Cognifyz Frontend Internship showcase ready for GitHub Pages"

# Rename default branch to main
git branch -M main

# Link to your newly created GitHub repository (replace with your actual GitHub URL)
git remote add origin https://github.com/<your-username>/<your-repository-name>.git

# Push code to GitHub
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

You can choose either of the following two deployment methods:

#### Method A: Automated Deployment via GitHub Actions (Recommended)
1. Go to your repository on GitHub.
2. Click **Settings** $\rightarrow$ **Pages** (under Code and automation in the left sidebar).
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically run and publish your site within 1–2 minutes!

#### Method B: Deploy from Branch (Classic Method)
1. Go to your repository on GitHub.
2. Click **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`.
5. Click **Save**.

---

### Step 4: Access Your Live Website

Once deployment completes (typically under 60 seconds):
- Your live URL will be:
  ```
  https://<your-username>.github.io/<your-repository-name>/
  ```
- You can find the live link directly in your GitHub repository's **About** section or under **Settings** $\rightarrow$ **Pages**.

---

## Verification Checklist for GitHub Pages

- [x] Root `index.html` serves as the entry page.
- [x] Zero root-relative links (`/`) that break subfolder hosting.
- [x] `.nojekyll` prevents underscore partial stripping.
- [x] `.github/workflows/deploy.yml` handles automated deployment.
- [x] Dark/Light theme toggle persists via browser `localStorage`.
- [x] All 8 task showcase evaluator pages and standalone demos resolve seamlessly.

