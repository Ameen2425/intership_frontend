/**
 * ==========================================================================
 * COGNIFYZ TECHNOLOGIES - FRONT-END DEVELOPMENT INTERNSHIP
 * FILE: js/main.js
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- TASK FILTER ENGINE ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const taskCards = document.querySelectorAll('.task-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      taskCards.forEach(card => {
        const cardLevel = card.getAttribute('data-level');
        if (filterVal === 'all' || cardLevel === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- STATS COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  function animateStats() {
    if (hasAnimatedStats) return;
    statNumbers.forEach(numEl => {
      const target = parseInt(numEl.getAttribute('data-target') || numEl.textContent, 10);
      const suffix = numEl.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 30));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          numEl.textContent = `${target}${suffix}`;
          clearInterval(timer);
        } else {
          numEl.textContent = `${current}${suffix}`;
        }
      }, 30);
    });
    hasAnimatedStats = true;
  }

  // Trigger stat counter when in viewport
  const statsSection = document.querySelector('.hero-stats-row');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

  // --- CONTACT MODAL / FEEDBACK MODAL ---
  const contactForm = document.getElementById('contact-form');
  const contactModal = document.getElementById('contact-modal');
  const openContactBtns = document.querySelectorAll('.open-contact-btn');
  const closeContactBtn = document.getElementById('close-contact-modal');
  const contactToast = document.getElementById('contact-toast');

  if (openContactBtns.length > 0 && contactModal) {
    openContactBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeContactBtn) {
      closeContactBtn.addEventListener('click', () => {
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Show Toast
        if (contactToast) {
          contactToast.classList.add('show');
          setTimeout(() => {
            contactToast.classList.remove('show');
          }, 3500);
        }
        contactForm.reset();
      });
    }
  }
});

