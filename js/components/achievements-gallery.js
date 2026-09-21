export function setupAchievementsGallery() {
  // original gallery track / prev / next logic preserved exactly
  const track = document.getElementById('gallery-track');
  if (!track) return;

  let index = 0;
  const slides = track.querySelectorAll('.gallery-slide');
  const total = slides.length;

  const goTo = (i) => {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  // attach any existing prev/next buttons if present in the HTML
  document.querySelectorAll('.gallery-prev').forEach(btn => {
    btn.addEventListener('click', () => goTo(index - 1));
  });
  document.querySelectorAll('.gallery-next').forEach(btn => {
    btn.addEventListener('click', () => goTo(index + 1));
  });
}
