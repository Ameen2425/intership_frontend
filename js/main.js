/**
 * COGNIFYZ TECHNOLOGIES - FRONT-END DEVELOPMENT INTERNSHIP
 * FILE: js/main.js
 * Clean, standard client-side interactivity for the main showcase portal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- TASK CATEGORY FILTER ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const taskCards = document.querySelectorAll('.task-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      taskCards.forEach(card => {
        const cardLevel = card.getAttribute('data-level');
        if (filterVal === 'all' || cardLevel === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- SMOOTH SCROLLING ENHANCEMENT ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
