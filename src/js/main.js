
document.addEventListener('DOMContentLoaded', () => {
  // --- Sidebar Toggle Logic ---
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function updateToggleLabel() {
    if (!sidebarToggle) return;
    const isMobile = window.innerWidth <= 768;
    const isOpen = isMobile
      ? document.body.classList.contains('sidebar-open')
      : !document.body.classList.contains('sidebar-collapsed');
    const label = isOpen ? 'Close sidebar' : 'Open sidebar';
    sidebarToggle.title = label;
    sidebarToggle.setAttribute('aria-label', label);
  }

  function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      document.body.classList.toggle('sidebar-open');
      if (sidebarToggle) {
        sidebarToggle.textContent = document.body.classList.contains('sidebar-open') ? '✕' : '☰';
      }
    } else {
      document.body.classList.toggle('sidebar-collapsed');
    }
    updateToggleLabel();
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      document.body.classList.remove('sidebar-open');
      if (sidebarToggle) sidebarToggle.textContent = '☰';
      updateToggleLabel();
    });
  }

  // Reset state on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.body.classList.remove('sidebar-open');
      if (sidebarToggle) sidebarToggle.textContent = '☰';
      updateToggleLabel();
    }
  });


  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  // --- Journal Titles Logic ---
  const listEl = document.getElementById('titleList');
  if (listEl) {
    function slugify(text) {
      return text.toLowerCase()
        .replace(/[^a-z0-9\s\-–—]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\-+/g, '-')
        .trim();
    }

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
          if (sidebarToggle) sidebarToggle.textContent = '☰';
        }
      });
      li.appendChild(a);
      listEl.appendChild(li);
    });
  }

  // --- Year Update Logic ---
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // --- Scroll-triggered fade-in animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  // --- Copy Email Logic ---
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('joshuatt.chau@mail.utoronto.ca').then(() => {
        const textSpan = btn.querySelector('.email-text');
        if (!textSpan) return;
        const originalText = textSpan.textContent;
        textSpan.textContent = 'Copied!';
        btn.style.color = 'var(--sidebar-link-hover)';
        
        setTimeout(() => {
          textSpan.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      });
    });
  });

});
