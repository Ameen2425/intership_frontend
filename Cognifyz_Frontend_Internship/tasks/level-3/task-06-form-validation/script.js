/**
 * Cognifyz Technologies - Task 06: Form Styling & Validation
 * Real-time client-side validation with regex, password entropy, and summary modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const messageInput = document.getElementById('message');
  const termsCheckbox = document.getElementById('terms');
  const clearBtn = document.getElementById('clear-btn');

  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password-btn');
  const charCounter = document.getElementById('char-counter');
  const strengthMeterBar = document.getElementById('strength-meter-bar');
  const strengthLabel = document.getElementById('strength-label');
  const strengthHint = document.getElementById('strength-hint');

  const successModal = document.getElementById('success-modal');
  const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');
  const submissionSummary = document.getElementById('submission-summary');

  // Regex patterns
  const NAME_REGEX = /^[a-zA-Z\s]{3,50}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_REGEX = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]{10,15}$/;

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

  // Calculate password strength score based on length, cases, numbers, and symbols
  function evaluatePasswordStrength(val) {
    let score = 0;
    if (val.length >= 8) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    if (val.length === 0) {
      strengthMeterBar.style.width = '0%';
      strengthMeterBar.style.backgroundColor = '#334155';
      strengthLabel.textContent = 'None';
      strengthLabel.style.color = 'var(--text-muted)';
      strengthHint.textContent = 'Min. 8 chars, 1 uppercase, 1 digit, 1 symbol';
    } else if (score <= 1) {
      strengthMeterBar.style.width = '25%';
      strengthMeterBar.style.backgroundColor = '#ef4444';
      strengthLabel.textContent = 'Weak';
      strengthLabel.style.color = '#ef4444';
      strengthHint.textContent = 'Add uppercase, numbers, and symbols';
    } else if (score === 2) {
      strengthMeterBar.style.width = '50%';
      strengthMeterBar.style.backgroundColor = '#f59e0b';
      strengthLabel.textContent = 'Fair';
      strengthLabel.style.color = '#f59e0b';
      strengthHint.textContent = 'Add symbols to strengthen';
    } else if (score === 3) {
      strengthMeterBar.style.width = '75%';
      strengthMeterBar.style.backgroundColor = '#38bdf8';
      strengthLabel.textContent = 'Good';
      strengthLabel.style.color = '#38bdf8';
      strengthHint.textContent = 'Strong combination';
    } else {
      strengthMeterBar.style.width = '100%';
      strengthMeterBar.style.backgroundColor = '#10b981';
      strengthLabel.textContent = 'Excellent';
      strengthLabel.style.color = '#10b981';
      strengthHint.textContent = 'Secure password';
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
    const passwordVal = passwordInput.value;
    const confirmVal = confirmPasswordInput.value;

    if (!confirmVal) {
      setFieldState('group-confirm-password', false, 'Please confirm your password.');
      return false;
    }
    if (confirmVal !== passwordVal) {
      setFieldState('group-confirm-password', false, 'Passwords do not match.');
      return false;
    }
    setFieldState('group-confirm-password', true);
    return true;
  }

  function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
      setFieldState('group-gender', false, 'Please select your gender.');
      return false;
    }
    setFieldState('group-gender', true);
    return true;
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      setFieldState('group-message', false, 'Message is required.');
      return false;
    }
    if (val.length < 20) {
      setFieldState('group-message', false, `Message must be at least 20 characters (currently ${val.length}).`);
      return false;
    }
    setFieldState('group-message', true);
    return true;
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      setFieldState('group-terms', false, 'You must agree before submitting.');
      return false;
    }
    setFieldState('group-terms', true);
    return true;
  }

  function setupPasswordToggle(btn, input) {
    btn.addEventListener('click', () => {
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      btn.textContent = isPassword ? '🙈' : '👁️';
    });
  }
  setupPasswordToggle(togglePasswordBtn, passwordInput);
  setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);

  // Live input events
  fullnameInput.addEventListener('input', validateFullName);
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);

  passwordInput.addEventListener('input', () => {
    evaluatePasswordStrength(passwordInput.value);
    validatePassword();
    if (confirmPasswordInput.value) validateConfirmPassword();
  });

  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', validateGender);
  });

  messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCounter.textContent = `${count} / 500 characters`;
    charCounter.style.color = count >= 480 ? '#ef4444' : 'var(--text-muted)';
    validateMessage();
  });

  termsCheckbox.addEventListener('change', validateTerms);

  // Clear Form
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all form fields?')) {
      form.reset();
      [
        'group-fullname', 'group-email', 'group-phone', 
        'group-password', 'group-confirm-password', 
        'group-gender', 'group-message', 'group-terms'
      ].forEach(clearFieldState);
      evaluatePasswordStrength('');
      charCounter.textContent = '0 / 500 characters';
    }
  });

  // Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateFullName() && validateEmail() && validatePhone() && 
                    validatePassword() && validateConfirmPassword() && 
                    validateGender() && validateMessage() && validateTerms();

    if (!isValid) {
      const firstError = document.querySelector('.form-group.has-error');
      if (firstError) {
        const input = firstError.querySelector('input, textarea');
        if (input) input.focus();
      }
      return;
    }

    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    submissionSummary.innerHTML = `
      <div class="summary-item"><span class="summary-label">Full Name:</span><span class="summary-val">${fullnameInput.value.trim()}</span></div>
      <div class="summary-item"><span class="summary-label">Email:</span><span class="summary-val">${emailInput.value.trim()}</span></div>
      <div class="summary-item"><span class="summary-label">Phone:</span><span class="summary-val">${phoneInput.value.trim()}</span></div>
      <div class="summary-item"><span class="summary-label">Gender:</span><span class="summary-val">${selectedGender}</span></div>
      <div class="summary-item"><span class="summary-label">Message Length:</span><span class="summary-val">${messageInput.value.trim().length} chars</span></div>
      <div class="summary-item"><span class="summary-label">Submission Time:</span><span class="summary-val">${new Date().toLocaleTimeString()}</span></div>
    `;

    successModal.style.display = 'flex';
  });

  closeSuccessModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) successModal.style.display = 'none';
  });
});
