import { slugify } from './utils.js';

export function initJournal() {
  const listEl = document.getElementById('titleList');
  if (listEl) {
    const entries = document.querySelectorAll('.entry');
    entries.forEach((entry, idx) => {
      const h2 = entry.querySelector('h2');
      if (!h2) return;
      let id = entry.id || slugify(h2.textContent) || `entry-${idx + 1}`;
      entry.id = id; // ensure the article is linkable
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = h2.textContent;
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          document.body.classList.remove('sidebar-open');
          const sidebarToggle = document.getElementById('sidebarToggle');
          if (sidebarToggle) sidebarToggle.textContent = '☰';
        }
      });
      li.appendChild(a);
      listEl.appendChild(li);
    });
  }
}
