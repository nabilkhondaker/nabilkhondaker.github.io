export function setupWikiViewer() {
  const wikiBtn = document.getElementById('wiki-btn');
  const wikiModal = document.getElementById('wiki-modal');
  const wikiCloseBtn = document.getElementById('wiki-close-btn');
  const wikiRefreshBtn = document.getElementById('wiki-refresh-btn');
  const wikiImage = document.getElementById('wiki-image');

  const wikiData = [
    "img/wiki/1.jpg", "img/wiki/2.jpg", "img/wiki/3.jpg", "img/wiki/4.jpg", "img/wiki/5.jpg",
    "img/wiki/6.webp", "img/wiki/7.jpg", "img/wiki/8.jpg", "img/wiki/9.jpg", "img/wiki/10.jpg",
    "img/wiki/11.jpg", "img/wiki/12.webp", "img/wiki/13.jpg", "img/wiki/14.webp", "img/wiki/15.jpg",
    "img/wiki/16.jpg", "img/wiki/17.webp", "img/wiki/18.jpg", "img/wiki/19.jpg", "img/wiki/20.jpg",
    "img/wiki/21.jpg", "img/wiki/22.jpg", "img/wiki/23.webp", "img/wiki/24.jpg", "img/wiki/25.jpg",
    "img/wiki/26.jpg", "img/wiki/27.jpg", "img/wiki/28.jpg", "img/wiki/29.jpg", "img/wiki/30.webp",
    "img/wiki/31.jpg", "img/wiki/32.jpg", "img/wiki/33.jpg", "img/wiki/34.jpg", "img/wiki/35.jpg",
    "img/wiki/36.jpg", "img/wiki/37.jpg", "img/wiki/38.jpg", "img/wiki/39.jpg", "img/wiki/40.webp",
    "img/wiki/41.jpg", "img/wiki/42.jpg", "img/wiki/43.jpg", "img/wiki/44.webp", "img/wiki/45.jpg",
    "img/wiki/46.webp", "img/wiki/47.jpg", "img/wiki/48.jpg", "img/wiki/49.jpg", "img/wiki/50.jpg",
    "img/wiki/51.jpg", "img/wiki/52.jpg", "img/wiki/53.jpg", "img/wiki/54.jpg", "img/wiki/55.jpg",
    "img/wiki/56.jpg", "img/wiki/57.jpg", "img/wiki/58.jpg", "img/wiki/59.jpg", "img/wiki/60.jpg",
    "img/wiki/61.jpg", "img/wiki/62.jpg", "img/wiki/63.jpg", "img/wiki/64.jpg", "img/wiki/65.jpg",
    "img/wiki/66.jpg", "img/wiki/67.jpg", "img/wiki/68.jpg", "img/wiki/69.jpg", "img/wiki/70.jpg",
    "img/wiki/71.jpg", "img/wiki/72.jpg", "img/wiki/73.jpg", "img/wiki/74.jpg", "img/wiki/75.jpg",
    "img/wiki/76.jpg", "img/wiki/77.jpg", "img/wiki/78.jpg", "img/wiki/79.jpg", "img/wiki/80.jpg",
    "img/wiki/81.webp", "img/wiki/82.jpg", "img/wiki/83.jpg", "img/wiki/84.jpg", "img/wiki/85.jpg",
    "img/wiki/86.jpg", "img/wiki/87.jpg", "img/wiki/88.jpg", "img/wiki/89.jpg", "img/wiki/90.jpg",
    "img/wiki/91.jpg", "img/wiki/92.jpg", "img/wiki/93.jpg", "img/wiki/94.jpg", "img/wiki/95.jpg",
    "img/wiki/96.jpg", "img/wiki/97.webp", "img/wiki/98.jpg", "img/wiki/99.webp", "img/wiki/100.jpg",
    "img/wiki/101.jpg", "img/wiki/102.jpg", "img/wiki/103.jpg", "img/wiki/104.webp", "img/wiki/105.jpg",
    "img/wiki/106.jpg", "img/wiki/107.jpg", "img/wiki/108.jpg", "img/wiki/109.jpg", "img/wiki/110.jpg",
    "img/wiki/111.jpg", "img/wiki/112.jpg", "img/wiki/113.jpg", "img/wiki/114.jpg", "img/wiki/115.jpg",
    "img/wiki/116.jpg", "img/wiki/117.webp", "img/wiki/118.jpg", "img/wiki/119.jpg", "img/wiki/120.webp",
    "img/wiki/121.jpg", "img/wiki/122.jpg", "img/wiki/123.jpg", "img/wiki/124.jpg", "img/wiki/125.jpg",
    "img/wiki/126.jpg", "img/wiki/127.jpg", "img/wiki/128.jpg", "img/wiki/129.jpg", "img/wiki/130.jpg",
    "img/wiki/131.jpg", "img/wiki/132.jpg", "img/wiki/133.webp", "img/wiki/134.webp", "img/wiki/135.jpg",
    "img/wiki/136.jpg", "img/wiki/137.jpg", "img/wiki/138.webp", "img/wiki/139.jpg", "img/wiki/140.jpg",
    "img/wiki/141.jpg", "img/wiki/142.jpg", "img/wiki/143.jpg", "img/wiki/144.jpg", "img/wiki/145.jpg",
    "img/wiki/146.jpg", "img/wiki/147.jpg", "img/wiki/148.jpg", "img/wiki/149.jpg", "img/wiki/150.jpg",
    "img/wiki/151.webp", "img/wiki/152.jpg", "img/wiki/153.jpg", "img/wiki/154.jpg", "img/wiki/155.jpg",
    "img/wiki/156.jpg", "img/wiki/157.jpg", "img/wiki/158.jpg", "img/wiki/159.jpg", "img/wiki/160.jpg",
    "img/wiki/161.jpg", "img/wiki/162.jpg", "img/wiki/163.jpg", "img/wiki/164.webp", "img/wiki/165.jpg",
    "img/wiki/166.jpg", "img/wiki/167.jpg", "img/wiki/168.webp", "img/wiki/169.jpg", "img/wiki/170.jpg",
    "img/wiki/171.jpg", "img/wiki/172.jpg", "img/wiki/173.jpg", "img/wiki/174.jpg", "img/wiki/175.jpg",
    "img/wiki/176.jpg", "img/wiki/177.jpg", "img/wiki/178.jpg", "img/wiki/179.jpg", "img/wiki/180.jpg",
    "img/wiki/181.jpg", "img/wiki/182.jpg", "img/wiki/183.jpg", "img/wiki/184.jpg", "img/wiki/185.jpg",
    "img/wiki/186.jpg", "img/wiki/187.jpg", "img/wiki/188.jpg", "img/wiki/189.jpg"
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * wikiData.length);
    const imagePath = wikiData[randomIndex];

    wikiImage.style.opacity = '0';
    setTimeout(() => {
      wikiImage.src = imagePath;
      wikiImage.onload = () => {
        wikiImage.style.opacity = '1';
      };
    }, 200);
  };

  if (wikiImage) wikiImage.style.transition = 'opacity 0.2s ease';

  if (wikiBtn && wikiModal) {
    wikiBtn.addEventListener('click', () => {
      getRandomImage();
      wikiModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      wikiModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    };

    wikiCloseBtn.addEventListener('click', closeModal);
    wikiModal.addEventListener('click', (e) => {
      if (e.target === wikiModal) closeModal();
    });

    if (wikiRefreshBtn) {
      wikiRefreshBtn.addEventListener('click', () => {
        const icon = wikiRefreshBtn.querySelector('i');
        icon.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        icon.style.transform = `rotate(${(wikiRefreshBtn.clicks || 1) * 360}deg)`;
        wikiRefreshBtn.clicks = (wikiRefreshBtn.clicks || 1) + 1;
        getRandomImage();
      });
    }
  }
}
