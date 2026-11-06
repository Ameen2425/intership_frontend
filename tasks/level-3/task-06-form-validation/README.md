# Task 06: Form Styling and Client-Side Validation

**Internship Track:** Cognifyz Technologies Front-End Development Internship  
**Level:** Level 3 — Advanced  
**Directory:** `tasks/level-3/task-06-form-validation/`  

---

## Task Overview
This project demonstrates robust client-side form validation using JavaScript ES6+. The registration form validates Full Name, Email, Phone, Password, Confirm Password, Gender, and Motivation Message, featuring real-time input validation, password entropy strength metering, password peek toggles, dynamic character counters, and an accessible success verification modal.

## Technologies Used
- HTML5 Form Elements & Attributes (`novalidate`, `required`, `maxlength`, `aria-invalid`)
- CSS3 (Custom-styled radio cards, checkboxes, and glowing borders)
- JavaScript ES6+ (Regex verification, entropy algorithms, DOM events)

## Key Features Implemented
1. **Regular Expression Validation:** RFC-compliant Email checking, Name character validation, and 10+ digit phone numbers.
2. **Password Entropy Meter:** Live visual progress bar grading passwords across 4 tiers (Weak, Fair, Good, Excellent).
3. **Synchronous Password Match:** Real-time confirmation matching against the password field.
4. **Password Visibility Toggle:** Eye icon button switching input between `password` and `text`.
5. **Live Character Counter:** Real-time count of message length (0–500 characters).
6. **Submission Summary Modal:** Dialog presenting the validated candidate payload upon successful submission.

## Files
- `index.html` - Evaluator & Task Explanation page with live demonstration.
- `demo.html` - Standalone registration form implementation.
- `styles.css` - Stylesheet for form inputs, strength meter, and validation classes.
- `script.js` - Real-time input validation and form submission handling.

## How to Test
1. Open `index.html` to review documentation and embedded demo.
2. Click **"Open Standalone Demo ↗"**.
3. Attempt empty submission to test error highlights, then fill valid data to test the password meter and submit to view the modal summary.
