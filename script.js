(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const items = document.querySelectorAll(".gallery-item");
  let lastFocus = null;

  function openLightbox(src, alt) {
    lastFocus = document.activeElement;
    img.src = src;
    img.alt = alt || "";
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    img.removeAttribute("src");
    img.alt = "";
    document.body.classList.remove("lightbox-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const full = item.getAttribute("data-full");
      const thumb = item.querySelector("img");
      if (!full) return;
      openLightbox(full, thumb ? thumb.alt : "");
    });
  });

  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
