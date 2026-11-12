/**
 * Cognifyz Technologies - Task 05: REST API Blog & Content Explorer
 * Fetches real posts from JSONPlaceholder, supports live search, filtering,
 * pagination, and interactive discussion thread modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
  const POSTS_PER_PAGE = 9;

  let allPosts = [];
  let filteredPosts = [];
  let currentPage = 1;

  // DOM references
  const postsContainer = document.getElementById('posts-container');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const authorFilter = document.getElementById('author-filter');
  const sortSelect = document.getElementById('sort-select');
  const refreshBtn = document.getElementById('refresh-btn');
  const errorBox = document.getElementById('error-box');
  const retryBtn = document.getElementById('retry-btn');
  const countVisible = document.getElementById('count-visible');
  const countTotal = document.getElementById('count-total');
  const pageSummary = document.getElementById('page-summary');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageNumbers = document.getElementById('page-numbers');
  const apiDot = document.getElementById('api-dot');

  // Modal references
  const postModal = document.getElementById('post-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalAuthorTag = document.getElementById('modal-author-tag');
  const modalPostTitle = document.getElementById('modal-post-title');
  const modalPostBody = document.getElementById('modal-post-body');
  const commentsList = document.getElementById('comments-list');
  const commentsCount = document.getElementById('comments-count');

  // Display skeleton placeholders while loading
  function renderSkeletons(count = 9) {
    postsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const el = document.createElement('article');
      el.className = 'skeleton-card';
      el.innerHTML = `
        <div class="skeleton-shimmer skeleton-pill"></div>
        <div class="skeleton-shimmer skeleton-title"></div>
        <div class="skeleton-shimmer skeleton-line"></div>
        <div class="skeleton-shimmer skeleton-line"></div>
        <div class="skeleton-shimmer skeleton-line short"></div>
      `;
      postsContainer.appendChild(el);
    }
  }

  // Fetch posts from API
  async function loadPosts() {
    renderSkeletons(POSTS_PER_PAGE);
    errorBox.style.display = 'none';

    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      allPosts = data;
      countTotal.textContent = allPosts.length;
      apiDot.style.background = '#22c55e';
      applyFilters();
    } catch (err) {
      console.error('Fetch error:', err);
      apiDot.style.background = '#ef4444';
      postsContainer.innerHTML = '';
      errorBox.style.display = 'block';
    }
  }

  // Filter and sort posts
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedAuthor = authorFilter.value;
    const sortMode = sortSelect.value;

    filteredPosts = allPosts.filter(post => {
      const matchesSearch = query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query);
      const matchesAuthor = selectedAuthor === 'all' || post.userId === Number(selectedAuthor);
      return matchesSearch && matchesAuthor;
    });

    // Sort
    if (sortMode === 'id-asc') {
      filteredPosts.sort((a, b) => a.id - b.id);
    } else if (sortMode === 'id-desc') {
      filteredPosts.sort((a, b) => b.id - a.id);
    } else if (sortMode === 'title-asc') {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    currentPage = 1;
    renderCurrentPage();
  }

  // Render current slice of posts
  function renderCurrentPage() {
    const total = filteredPosts.length;
    countVisible.textContent = total;

    const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
    pageSummary.textContent = `Page ${currentPage} of ${totalPages}`;

    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const pageItems = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

    postsContainer.innerHTML = '';

    if (pageItems.length === 0) {
      postsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #ffffff; border: 1px solid #e8e4dc; border-radius: 8px;">
          <h3 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 8px;">No matching articles found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try modifying your keyword search or author filter.</p>
        </div>
      `;
      pageNumbers.innerHTML = '';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    pageItems.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <div class="card-top-meta">
          <span class="author-chip">Author ${post.userId}</span>
          <span class="post-id-badge">#${post.id}</span>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-body">${post.body.slice(0, 110)}...</p>
        <div>
          <button class="read-post-btn" data-id="${post.id}">
            Read Article &rarr;
          </button>
        </div>
      `;
      postsContainer.appendChild(card);
    });

    // Attach click handlers to read buttons
    document.querySelectorAll('.read-post-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        openPostModal(id);
      });
    });

    renderPagination(totalPages);
  }

  // Render pagination buttons
  function renderPagination(totalPages) {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    pageNumbers.innerHTML = '';
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      const btn = document.createElement('button');
      btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => {
        currentPage = i;
        renderCurrentPage();
        window.scrollTo({ top: 200, behavior: 'smooth' });
      });
      pageNumbers.appendChild(btn);
    }
  }

  // Open post reader modal with comments
  async function openPostModal(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (!post) return;

    modalAuthorTag.textContent = `Author ${post.userId} &bull; Post #${post.id}`;
    modalPostTitle.textContent = post.title;
    modalPostBody.textContent = post.body;
    commentsCount.textContent = 'Loading...';
    commentsList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 12px 0;">Fetching reader discussion...</div>';
    postModal.classList.add('open');

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      if (res.ok) {
        const comments = await res.json();
        commentsCount.textContent = comments.length;
        commentsList.innerHTML = '';
        comments.forEach(c => {
          const item = document.createElement('div');
          item.className = 'comment-item';
          item.innerHTML = `
            <div class="comment-author">${c.email}</div>
            <div class="comment-text">${c.body}</div>
          `;
          commentsList.appendChild(item);
        });
      }
    } catch {
      commentsCount.textContent = '0';
      commentsList.innerHTML = '<div style="color: var(--text-muted);">Failed to load comments.</div>';
    }
  }

  // Modal close handlers
  modalCloseBtn.addEventListener('click', () => postModal.classList.remove('open'));
  postModal.addEventListener('click', (e) => {
    if (e.target === postModal) postModal.classList.remove('open');
  });

  // Controls event listeners
  searchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = searchInput.value ? 'inline' : 'none';
    applyFilters();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    applyFilters();
  });

  authorFilter.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  refreshBtn.addEventListener('click', loadPosts);
  retryBtn.addEventListener('click', loadPosts);

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderCurrentPage();
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  });

  // Initial load
  loadPosts();
});
