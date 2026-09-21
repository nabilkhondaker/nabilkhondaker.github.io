export function setupEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      const emailLink = emailText.querySelector('a');
      const targetString = emailLink ? emailLink.textContent.trim() : emailText.textContent.trim();
      navigator.clipboard.writeText(targetString)
        .then(() => {
          const originalIcon = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #23a55a;"></i>';
          copyBtn.style.pointerEvents = 'none';
          setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.style.pointerEvents = 'auto';
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy email: ', err);
        });
    });
  }
}
