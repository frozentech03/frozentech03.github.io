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

(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        status.classList.add("is-success");
        status.textContent = "Thanks — your message has been sent. I'll reply by email soon.";
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = "Sorry, something went wrong. Please email me directly instead.";
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
