export function initSidebar() {
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
}
