export function setupClock() {
  const clockEl = document.getElementById('clock-time');
  if (!clockEl) return;

  const update = () => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  update();
  setInterval(update, 1000);
}
