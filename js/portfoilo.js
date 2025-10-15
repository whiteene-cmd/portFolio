document.addEventListener("DOMContentLoaded", () => {
  const toTop = document.querySelector(".scrollUp");
  if (!toTop) return;

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  toTop.blur();

  const marquee = document.querySelector('.marquee');
  if (!marquee) return;

  const track = marquee.querySelector('.posterpack');
  const speed = Number(marquee.dataset.speed || 200); // px/s

  // 1) 트랙을 2배 이상 채울 때까지 자식들을 복제
  const items = Array.from(track.children);
  const containerWidth = marquee.clientWidth;

  // 한 번은 통째로 복제해서 200% 만들기
  items.forEach(el => track.appendChild(el.cloneNode(true)));

  // 만약 이미지 수가 적어 200%가 안되면 더 복제
  while (track.scrollWidth < containerWidth * 2) {
    items.forEach(el => track.appendChild(el.cloneNode(true)));
  }

  // 2) 트랙 전체 길이에 맞춰 duration(초) 계산
  // 절반 길이(=원본 길이)만큼 이동하므로 /2
  const travel = track.scrollWidth / 2;  // px
  const duration = travel / speed;       // s
  track.style.setProperty('--duration', `${duration}s`);

  // 3) 이미지가 로드되기 전에 계산되면 오차가 생길 수 있어 재계산
  const imgs = track.querySelectorAll('img');
  let loaded = 0;
  imgs.forEach(img => {
    if (img.complete) { if (++loaded === imgs.length) recalc(); }
    else img.addEventListener('load', () => { if (++loaded === imgs.length) recalc(); });
  });
  function recalc(){
    const travel2 = track.scrollWidth / 2;
    const duration2 = travel2 / speed;
    track.style.setProperty('--duration', `${duration2}s`);
  }

});