/**
 * Cognifyz Technologies - Task 05: REST API Integration
 * Consumes public posts from JSONPlaceholder using Fetch API and async/await.
 */

document.addEventListener('DOMContentLoaded', () => {
  const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
  const BROKEN_ENDPOINT = 'https://jsonplaceholder.typicode.com/invalid-broken-endpoint-404';

  let allPosts = [];
  let filteredPosts = [];
  let currentPage = 1;
  let postsPerPage = 18;

  // DOM Elements
  const postsContainer = document.getElementById('posts-container');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const authorFilter = document.getElementById('author-filter');
  const sortSelect = document.getElementById('sort-select');
  const perPageSelect = document.getElementById('per-page-select');
  const refreshApiBtn = document.getElementById('refresh-api-btn');
  const simulateErrorBtn = document.getElementById('simulate-error-btn');
  const errorNotice = document.getElementById('error-notice');
  const errorTitle = document.getElementById('error-title');
  const errorDesc = document.getElementById('error-desc');
  const retryBtn = document.getElementById('retry-btn');

  // Stats
  const statTotal = document.getElementById('stat-total');
  const statVisible = document.getElementById('stat-visible');
  const statLatency = document.getElementById('stat-latency');
  const statStatus = document.getElementById('stat-status');
  const apiStatusDot = document.getElementById('api-status-dot');

  // Pagination
  const paginationControls = document.getElementById('pagination-controls');
  const prevPageBtn = document.getElementById('prev-page-btn');
  const nextPageBtn = document.getElementById('next-page-btn');
  const pageIndicator = document.getElementById('page-indicator');

  // Modal
  const postModal = document.getElementById('post-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalPostId = document.getElementById('modal-post-id');
  const modalUserId = document.getElementById('modal-user-id');
  const modalPostTitle = document.getElementById('modal-post-title');
  const modalPostBody = document.getElementById('modal-post-body');
  const modalCommentsList = document.getElementById('modal-comments-list');
  const commentsCountBadge = document.getElementById('comments-count-badge');

  function renderSkeletonLoader(count = 6) {
    postsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const card = document.createElement('div');
      card.className = 'skeleton-card';
      card.innerHTML = `
        <div class="skeleton-shimmer skeleton-badge"></div>
        <div class="skeleton-shimmer skeleton-title"></div>
        <div class="skeleton-shimmer skeleton-line"></div>
        <div class="skeleton-shimmer skeleton-line"></div>
        <div class="skeleton-shimmer skeleton-line short"></div>
        <div class="skeleton-shimmer skeleton-btn"></div>
      `;
      postsContainer.appendChild(card);
    }
  }

  // Fetch posts with latency tracking and error handling
  async function fetchPosts(endpointUrl = API_ENDPOINT) {
    renderSkeletonLoader(postsPerPage === 'all' ? 12 : Math.min(Number(postsPerPage), 12));
    errorNotice.style.display = 'none';
    statStatus.textContent = 'Fetching...';
    statStatus.style.color = 'var(--accent-blue)';
    apiStatusDot.className = 'status-indicator';

    const startTime = performance.now();

    try {
      const response = await fetch(endpointUrl);
      const endTime = performance.now();
      statLatency.textContent = `${Math.round(endTime - startTime)} ms`;

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      allPosts = data;

      statStatus.textContent = '200 OK';
      statStatus.style.color = 'var(--accent-emerald)';
      apiStatusDot.className = 'status-indicator online';
      statTotal.textContent = allPosts.length;

      applyFiltersAndRender();
    } catch (error) {
      statStatus.textContent = 'Error';
      statStatus.style.color = 'var(--accent-danger)';
      apiStatusDot.className = 'status-indicator error';
      statLatency.textContent = '-- ms';
      postsContainer.innerHTML = '';

      errorNotice.style.display = 'flex';
      errorTitle.textContent = 'Network Request Failed';
      errorDesc.textContent = `${error.message}. Click "Retry Connection" to fetch from the active API.`;
    }
  }

  function applyFiltersAndRender() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedAuthor = authorFilter.value;
    const sortMode = sortSelect.value;

    // Filter by keyword and author
    filteredPosts = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query);
      const matchesAuthor = selectedAuthor === 'all' || post.userId.toString() === selectedAuthor;
      return matchesSearch && matchesAuthor;
    });

    // Sort posts
    if (sortMode === 'id-asc') {
      filteredPosts.sort((a, b) => a.id - b.id);
    } else if (sortMode === 'id-desc') {
      filteredPosts.sort((a, b) => b.id - a.id);
    } else if (sortMode === 'title-asc') {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    statVisible.textContent = filteredPosts.length;

    // Reset pagination if needed
    const totalPages = Math.ceil(filteredPosts.length / (postsPerPage === 'all' ? (filteredPosts.length || 1) : Number(postsPerPage)));
    if (currentPage > totalPages) {
      currentPage = 1;
    }

    renderCurrentPage();
  }

  function renderCurrentPage() {
    postsContainer.innerHTML = '';

    if (filteredPosts.length === 0) {
      postsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🔎</div>
          <h3 style="color: #ffffff; margin-bottom: 4px;">No Matching Posts Found</h3>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Try clearing your search query or author filter.</p>
        </div>
      `;
      paginationControls.style.display = 'none';
      return;
    }

    let postsToDisplay = [];
    if (postsPerPage === 'all') {
      postsToDisplay = filteredPosts;
      paginationControls.style.display = 'none';
    } else {
      paginationControls.style.display = 'flex';
      const perPageNum = Number(postsPerPage);
      const totalPages = Math.ceil(filteredPosts.length / perPageNum);
      const startIndex = (currentPage - 1) * perPageNum;
      postsToDisplay = filteredPosts.slice(startIndex, startIndex + perPageNum);

      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage === totalPages;
    }

    postsToDisplay.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <div class="card-top-meta">
          <span class="post-id-badge">POST #${post.id}</span>
          <div class="user-author-tag">
            <span class="author-avatar">${post.userId}</span>
            <span>Author ${post.userId}</span>
          </div>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-body">${post.body.slice(0, 100)}...</p>
        <button class="read-more-btn" data-post-id="${post.id}">
          <span>View Discussion &amp; Comments</span>
          <span>&rarr;</span>
        </button>
      `;

      card.querySelector('.read-more-btn').addEventListener('click', () => openPostModal(post));
      postsContainer.appendChild(card);
    });
  }

  // Open modal and fetch comments for clicked post
  async function openPostModal(post) {
    modalPostId.textContent = `Post #${post.id}`;
    modalUserId.textContent = `Author #${post.userId}`;
    modalPostTitle.textContent = post.title;
    modalPostBody.textContent = post.body;
    modalCommentsList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">Loading comments...</div>';
    commentsCountBadge.textContent = 'Fetching...';

    postModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
      if (!response.ok) throw new Error('Could not load comments');
      const comments = await response.json();

      commentsCountBadge.textContent = `${comments.length} Comments`;
      modalCommentsList.innerHTML = '';

      comments.forEach(comment => {
        const item = document.createElement('div');
        item.className = 'comment-card';
        item.innerHTML = `
          <div class="comment-author">${comment.name}</div>
          <div class="comment-email">✉️ ${comment.email}</div>
          <div class="comment-body">${comment.body}</div>
        `;
        modalCommentsList.appendChild(item);
      });
    } catch (err) {
      modalCommentsList.innerHTML = `<div style="color: var(--accent-danger); font-size: 0.85rem;">Failed to load comments: ${err.message}</div>`;
      commentsCountBadge.textContent = 'Error';
    }
  }

  function closeModal() {
    postModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Event Listeners
  searchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
    currentPage = 1;
    applyFiltersAndRender();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    currentPage = 1;
    applyFiltersAndRender();
  });

  authorFilter.addEventListener('change', () => {
    currentPage = 1;
    applyFiltersAndRender();
  });

  sortSelect.addEventListener('change', applyFiltersAndRender);

  perPageSelect.addEventListener('change', (e) => {
    postsPerPage = e.target.value;
    currentPage = 1;
    applyFiltersAndRender();
  });

  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
      window.scrollTo({ top: postsContainer.offsetTop - 80, behavior: 'smooth' });
    }
  });

  nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredPosts.length / Number(postsPerPage));
    if (currentPage < totalPages) {
      currentPage++;
      renderCurrentPage();
      window.scrollTo({ top: postsContainer.offsetTop - 80, behavior: 'smooth' });
    }
  });

  refreshApiBtn.addEventListener('click', () => fetchPosts(API_ENDPOINT));
  simulateErrorBtn.addEventListener('click', () => fetchPosts(BROKEN_ENDPOINT));
  retryBtn.addEventListener('click', () => fetchPosts(API_ENDPOINT));

  closeModalBtn.addEventListener('click', closeModal);
  postModal.addEventListener('click', (e) => {
    if (e.target === postModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && postModal.style.display === 'flex') closeModal();
  });

  // Initial fetch
  fetchPosts(API_ENDPOINT);
});
