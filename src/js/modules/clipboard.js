export function initClipboard() {
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
}
