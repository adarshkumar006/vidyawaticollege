const galleryItems = [
  ...document.querySelectorAll(".gallery-item")
];

const galleryFilters = document.querySelectorAll(".gallery-filter");
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let visibleImages = [];
let currentImageIndex = 0;
let lastFocusedElement = null;

/* ===== FILTER GALLERY ===== */

function updateVisibleImages() {
  visibleImages = galleryItems.filter(
    item => !item.classList.contains("is-hidden")
  );
}

galleryFilters.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    galleryFilters.forEach(filterButton => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    galleryItems.forEach(item => {
      const category = item.dataset.category;

      item.classList.toggle(
        "is-hidden",
        filter !== "all" && category !== filter
      );
    });

    updateVisibleImages();
  });
});

/* ===== OPEN LIGHTBOX ===== */

function openLightbox(item) {
  updateVisibleImages();

  currentImageIndex = visibleImages.indexOf(item);

  if (currentImageIndex < 0) return;

  lastFocusedElement = document.activeElement;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  showLightboxImage();

  closeBtn.focus();
}

/* ===== SHOW IMAGE ===== */

function showLightboxImage() {
  const item = visibleImages[currentImageIndex];

  if (!item) return;

  const image = item.querySelector("img");
  const title = item.querySelector(".gallery-overlay h3");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = title
    ? title.textContent
    : image.alt;
}

/* ===== CLOSE LIGHTBOX ===== */

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  lightboxImage.src = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/* ===== NEXT / PREVIOUS ===== */

function showNextImage() {
  if (!visibleImages.length) return;

  currentImageIndex =
    (currentImageIndex + 1) % visibleImages.length;

  showLightboxImage();
}

function showPreviousImage() {
  if (!visibleImages.length) return;

  currentImageIndex =
    (currentImageIndex - 1 + visibleImages.length) %
    visibleImages.length;

  showLightboxImage();
}

/* Open by clicking an image or its view button */

galleryItems.forEach(item => {
  const image = item.querySelector("img");
  const viewButton = item.querySelector(".gallery-view");

  if (image) {
    image.addEventListener("click", () => openLightbox(item));
  }

  if (viewButton) {
    viewButton.addEventListener("click", () => openLightbox(item));
  }
});

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", showNextImage);
if (prevBtn) prevBtn.addEventListener("click", showPreviousImage);

/* Close when clicking the background */

if (lightbox) {
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

/* Keyboard controls */

document.addEventListener("keydown", event => {
  if (!lightbox || !lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
});

/* Initial setup */

updateVisibleImages();
