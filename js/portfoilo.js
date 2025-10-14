document.addEventListener("DOMContentLoaded", () => {
  const toTop = document.querySelector(".scrollUp");
  if (!toTop) return;

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  toTop.blur();
});