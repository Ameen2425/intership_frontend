/**
 * Cognifyz Technologies - Task 06: Candidate Registration Form Validation
 * Clean, standard JavaScript validation logic for inputs, regex checks,
 * password entropy rating, and accessible submission feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const trackSelect = document.getElementById('track');
  const messageInput = document.getElementById('message');
  const termsCheckbox = document.getElementById('terms');
  const clearBtn = document.getElementById('clear-btn');

  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password-btn');
  const charCounter = document.getElementById('char-counter');
  const strengthBarFill = document.getElementById('strength-bar-fill');
  const strengthLabel = document.getElementById('strength-label');
  const strengthHint = document.getElementById('strength-hint');

  const successModal = document.getElementById('success-modal');
  const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');
  const submissionSummary = document.getElementById('submission-summary');

  // Regex patterns
  const NAME_REGEX = /^[a-zA-Z\s]{3,50}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setFieldState(groupId, isValid, customMsg = null) {
    const group = document.getElementById(groupId);
    if (!group) return;

    const errorEl = group.querySelector('.error-msg');
    const input = group.querySelector('.form-input, .form-textarea');

    if (isValid) {
      group.classList.remove('has-error');
      group.classList.add('has-success');
      if (input) input.setAttribute('aria-invalid', 'false');
    } else {
      group.classList.remove('has-success');
      group.classList.add('has-error');
      if (input) input.setAttribute('aria-invalid', 'true');
      if (customMsg && errorEl) {
        errorEl.textContent = customMsg;
      }
    }
  }

  function clearFieldState(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.classList.remove('has-error', 'has-success');
  }

  function validateFullName() {
    const val = fullnameInput.value.trim();
    if (!val) {
      setFieldState('group-fullname', false, 'Full name is required.');
      return false;
    }
    if (!NAME_REGEX.test(val)) {
      setFieldState('group-fullname', false, 'Full name must contain at least 3 letters (letters & spaces only).');
      return false;
    }
    setFieldState('group-fullname', true);
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      setFieldState('group-email', false, 'Email address is required.');
      return false;
    }
    if (!EMAIL_REGEX.test(val)) {
      setFieldState('group-email', false, 'Please enter a valid email address.');
      return false;
    }
    setFieldState('group-email', true);
    return true;
  }

  function validatePhone() {
    const val = phoneInput.value.trim();
    if (!val) {
      setFieldState('group-phone', false, 'Phone number is required.');
      return false;
    }
    const digitsOnly = val.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setFieldState('group-phone', false, 'Phone number must contain at least 10 digits.');
      return false;
    }
    setFieldState('group-phone', true);
    return true;
  }

  function evaluatePasswordStrength(val) {
    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (!val) {
      strengthBarFill.style.width = '0%';
      strengthBarFill.style.backgroundColor = '#e2e8f0';
      strengthLabel.textContent = 'None';
      strengthLabel.style.color = 'var(--text-muted)';
      strengthHint.textContent = 'Use uppercase, digits & symbols';
      return score;
    }

    if (score <= 2) {
      strengthBarFill.style.width = '30%';
      strengthBarFill.style.backgroundColor = '#ef4444';
      strengthLabel.textContent = 'Weak';
      strengthLabel.style.color = '#dc2626';
      strengthHint.textContent = 'Add numbers and special characters';
    } else if (score <= 4) {
      strengthBarFill.style.width = '70%';
      strengthBarFill.style.backgroundColor = '#f59e0b';
      strengthLabel.textContent = 'Moderate';
      strengthLabel.style.color = '#d97706';
      strengthHint.textContent = 'Good start &bull; Add more symbols';
    } else {
      strengthBarFill.style.width = '100%';
      strengthBarFill.style.backgroundColor = '#16a34a';
      strengthLabel.textContent = 'Strong';
      strengthLabel.style.color = '#16a34a';
      strengthHint.textContent = 'Strong password criteria met';
    }

    return score;
  }

  function validatePassword() {
    const val = passwordInput.value;
    if (!val) {
      setFieldState('group-password', false, 'Password is required.');
      return false;
    }
    if (val.length < 8) {
      setFieldState('group-password', false, 'Password must be at least 8 characters long.');
      return false;
    }
    setFieldState('group-password', true);
    return true;
  }

  function validateConfirmPassword() {
    const pwd = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    if (!confirm) {
      setFieldState('group-confirm-password', false, 'Please confirm your password.');
      return false;
    }
    if (pwd !== confirm) {
      setFieldState('group-confirm-password', false, 'Passwords do not match.');
      return false;
    }
    setFieldState('group-confirm-password', true);
    return true;
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      setFieldState('group-message', false, 'Statement of interest is required.');
      return false;
    }
    if (val.length < 20) {
      setFieldState('group-message', false, `Please enter at least 20 characters (current: ${val.length}).`);
      return false;
    }
    setFieldState('group-message', true);
    return true;
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      setFieldState('group-terms', false, 'You must agree to the guidelines to continue.');
      return false;
    }
    setFieldState('group-terms', true);
    return true;
  }

  // Real-time listener attachments
  fullnameInput.addEventListener('blur', validateFullName);
  fullnameInput.addEventListener('input', () => {
    if (fullnameInput.parentElement.parentElement.classList.contains('has-error')) {
      validateFullName();
    }
  });

  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.parentElement.parentElement.classList.contains('has-error')) {
      validateEmail();
    }
  });

  phoneInput.addEventListener('blur', validatePhone);
  phoneInput.addEventListener('input', () => {
    if (phoneInput.parentElement.parentElement.classList.contains('has-error')) {
      validatePhone();
    }
  });

  passwordInput.addEventListener('input', () => {
    evaluatePasswordStrength(passwordInput.value);
    if (passwordInput.parentElement.parentElement.classList.contains('has-error')) {
      validatePassword();
    }
    if (confirmPasswordInput.value) {
      validateConfirmPassword();
    }
  });
  passwordInput.addEventListener('blur', validatePassword);

  confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
  confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.parentElement.parentElement.classList.contains('has-error')) {
      validateConfirmPassword();
    }
  });

  messageInput.addEventListener('input', () => {
    charCounter.textContent = messageInput.value.length;
    if (messageInput.parentElement.classList.contains('has-error')) {
      validateMessage();
    }
  });
  messageInput.addEventListener('blur', validateMessage);

  termsCheckbox.addEventListener('change', validateTerms);

  // Peek toggles
  togglePasswordBtn.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    togglePasswordBtn.textContent = isPwd ? '🙈' : '👁️';
  });

  toggleConfirmPasswordBtn.addEventListener('click', () => {
    const isPwd = confirmPasswordInput.type === 'password';
    confirmPasswordInput.type = isPwd ? 'text' : 'password';
    toggleConfirmPasswordBtn.textContent = isPwd ? '🙈' : '👁️';
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    form.reset();
    ['group-fullname', 'group-email', 'group-phone', 'group-password', 'group-confirm-password', 'group-track', 'group-message', 'group-terms'].forEach(clearFieldState);
    charCounter.textContent = '0';
    evaluatePasswordStrength('');
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPwdValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isMsgValid = validateMessage();
    const isTermsValid = validateTerms();

    if (isNameValid && isEmailValid && isPhoneValid && isPwdValid && isConfirmValid && isMsgValid && isTermsValid) {
      submissionSummary.innerHTML = `
        <div><strong>Applicant Name:</strong> ${fullnameInput.value.trim()}</div>
        <div><strong>Email Address:</strong> ${emailInput.value.trim()}</div>
        <div><strong>Contact Phone:</strong> ${phoneInput.value.trim()}</div>
        <div><strong>Chosen Specialization:</strong> ${trackSelect.options[trackSelect.selectedIndex].text}</div>
        <div><strong>Statement:</strong> ${messageInput.value.trim()}</div>
        <div style="margin-top: 8px; color: var(--color-success); font-weight: 700;">✓ Verified against client-side validation rules</div>
      `;
      successModal.classList.add('open');
    } else {
      const firstError = document.querySelector('.form-group.has-error input, .form-group.has-error textarea');
      if (firstError) {
        firstError.focus();
      }
    }
  });

  closeSuccessModalBtn.addEventListener('click', () => {
    successModal.classList.remove('open');
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('open');
    }
  });
});
