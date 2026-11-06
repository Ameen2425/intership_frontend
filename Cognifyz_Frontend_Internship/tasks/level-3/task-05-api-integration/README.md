# Task 05: Public REST API Integration

**Internship Track:** Cognifyz Technologies Front-End Development Internship  
**Level:** Level 3 — Advanced  
**Directory:** `tasks/level-3/task-05-api-integration/`  

---

## Task Overview
This project demonstrates asynchronous client-server communication using the modern Fetch API and `async/await`. The application fetches 100 posts from JSONPlaceholder, tracks request latency, displays skeleton loading animations, provides live search filtering and pagination, handles network errors gracefully with retry capabilities, and fetches nested comment threads inside an interactive modal.

## Technologies Used
- JavaScript ES6+ (Fetch API, Promises, `async/await`, `performance.now()`)
- REST Endpoint: JSONPlaceholder (`https://jsonplaceholder.typicode.com/posts`)
- CSS3 (Skeleton keyframe animations & modal backdrop blur)
- HTML5

## Key Features Implemented
1. **Asynchronous Data Ingestion:** Fetches and parses JSON records with latency measurement.
2. **Skeleton Loading UX:** Animated shimmer cards displayed during network flight.
3. **Live Search & Author Filtering:** Real-time query matching across post title and body, plus Author ID filtering.
4. **Pagination Controls:** Configurable posts-per-page (9, 18, 36, All) with Previous/Next controls.
5. **Modal Discussion Stream:** Opens clicked post and fetches nested comments from `/posts/{id}/comments`.
6. **Error Resiliency:** Built-in "Simulate Error" testing button and "Retry Connection" recovery.

## Files
- `index.html` - Evaluator & Task Explanation page with live demonstration.
- `demo.html` - Standalone REST API application.
- `styles.css` - Stylesheet for post cards, skeleton loaders, and modals.
- `script.js` - Asynchronous data fetching, filtering, and event handling.

## How to Test
1. Open `index.html` to review documentation and embedded demo.
2. Click **"Open Standalone Demo ↗"**.
3. Verify live posts render, test the search box, click a card to view comments, and click "Simulate Error" to verify retry handling.
