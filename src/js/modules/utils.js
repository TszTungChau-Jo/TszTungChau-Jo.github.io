export function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s\-–—]/g, '')
    .replace(/\s+/g, '-')
    .replace(/\-+/g, '-')
    .trim();
}

export function updateYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}
