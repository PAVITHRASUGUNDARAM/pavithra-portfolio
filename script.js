/** Bump this when you replace assets/Pavithra-Sugundaram-Resume.pdf so browsers load the new file. */
const RESUME_VERSION = "20260603";

const themeToggle = document.getElementById("themeToggle");
const yearEl = document.getElementById("year");
const animatedText = document.querySelector(".animated-text");
const contactForm = document.querySelector(".contact-form");
const revealNodes = document.querySelectorAll(".reveal");
const galleryModal = document.getElementById("galleryModal");
const galleryTitle = document.getElementById("galleryTitle");
const galleryImage = document.getElementById("galleryImage");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");
const closeGallery = document.getElementById("closeGallery");
const galleryCounter = document.getElementById("galleryCounter");
const galleryContent = document.querySelector(".gallery-content");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const lines = [
  "Flutter Mobile Development",
  "Full Stack Web Applications",
  "AWS Cloud Deployment",
  "Machine Learning Solutions",
];

const navbar = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scrollTop");

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const current = lines[lineIndex];
  const visible = isDeleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);

  if (animatedText) {
    animatedText.textContent = visible;
  }

  if (!isDeleting && charIndex > current.length + 1) {
    isDeleting = true;
    setTimeout(typeAnimation, 1000);
    return;
  }

  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    lineIndex = (lineIndex + 1) % lines.length;
  }

  setTimeout(typeAnimation, isDeleting ? 35 : 75);
}

function applyTheme(theme) {
  document.body.classList.toggle("theme-dark", theme === "dark");
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

function initSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");

  const animateBar = (bar) => {
    const level = Math.min(100, Math.max(0, Number(bar.dataset.level) || 0));
    bar.style.width = `${level}%`;
    bar.classList.add("animated");
  };

  if (!fills.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    fills.forEach(animateBar);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  fills.forEach((bar) => observer.observe(bar));
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-resume-link]").forEach((link) => {
  const base = (link.getAttribute("href") || "assets/Pavithra-Sugundaram-Resume.pdf").split("?")[0];
  link.href = `${base}?v=${RESUME_VERSION}`;
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you! Your message has been captured.");
    contactForm.reset();
  });
}

function showReveal(node) {
  node.classList.add("in-view");
}

function initRevealAnimations() {
  document.documentElement.classList.add("js-ready");

  if (!revealNodes.length) {
    return;
  }

  const revealImmediately = () => {
    revealNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        showReveal(node);
      }
    });
  };

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach(showReveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealNodes.forEach((node) => {
    if (!node.classList.contains("in-view")) {
      observer.observe(node);
    }
  });

  revealImmediately();
  window.addEventListener("load", revealImmediately);
  setTimeout(revealImmediately, 300);
}

let activeImages = [];
let activeIndex = 0;

function updateGalleryCounter() {
  if (!galleryCounter || !activeImages.length) {
    return;
  }
  galleryCounter.textContent = `${activeIndex + 1} / ${activeImages.length}`;
}

function setActiveImage(index) {
  if (!activeImages.length || !galleryImage) {
    return;
  }
  activeIndex = (index + activeImages.length) % activeImages.length;
  galleryImage.src = activeImages[activeIndex];
  galleryImage.alt = `Screenshot ${activeIndex + 1} of ${activeImages.length}`;
  updateGalleryCounter();
}

function openGalleryModal() {
  if (!galleryModal) {
    return;
  }
  if (typeof galleryModal.showModal === "function") {
    galleryModal.showModal();
  } else {
    galleryModal.setAttribute("open", "open");
  }
}

function closeGalleryModal() {
  if (!galleryModal) {
    return;
  }
  if (typeof galleryModal.close === "function") {
    galleryModal.close();
  } else {
    galleryModal.removeAttribute("open");
  }
}

function openGalleryFromButton(button) {
  const imageSet = normalizeGalleryPaths((button.dataset.images || "").split(","));

  if (!imageSet.length || !galleryModal || !galleryTitle) {
    return;
  }

  activeImages = imageSet;
  activeIndex = 0;
  galleryTitle.textContent = button.dataset.galleryTitle || "Project Gallery";
  setActiveImage(0);
  openGalleryModal();
}

document.addEventListener("click", (event) => {
  const galleryButton = event.target.closest(".gallery-btn");
  if (galleryButton) {
    openGalleryFromButton(galleryButton);
    return;
  }

  const preview = event.target.closest(".carousel-slide");
  if (preview) {
    const card = preview.closest(".showcase-card, .featured-project");
    const linkedGallery = card?.querySelector(".gallery-btn");
    if (linkedGallery) {
      openGalleryFromButton(linkedGallery);
    }
  }
});

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "svg"];

function normalizeGalleryPaths(paths) {
  return paths.map((path) => path.trim()).filter(Boolean);
}

function getNextImageSrc(currentSrc) {
  const clean = currentSrc.split("?")[0];
  const match = clean.match(/^(.*)\.(\w+)$/i);
  if (!match) {
    return "assets/project-screen.svg";
  }

  const base = match[1];
  const ext = match[2].toLowerCase();
  const index = IMAGE_EXTENSIONS.indexOf(ext);

  if (index >= 0 && index < IMAGE_EXTENSIONS.length - 1) {
    return `${base}.${IMAGE_EXTENSIONS[index + 1]}`;
  }

  return "assets/project-screen.svg";
}

function handleImageError(image) {
  const current = image.getAttribute("src") || "";
  const next = getNextImageSrc(current);

  if (next === current || image.dataset.fallbackDone === "true") {
    image.src = "assets/project-screen.svg";
    return;
  }

  if (next === "assets/project-screen.svg") {
    const fallback = image.dataset.fallback;
    if (fallback && !current.endsWith(fallback)) {
      image.src = fallback;
      return;
    }
    image.dataset.fallbackDone = "true";
  }

  image.src = next;
}

if (galleryImage) {
  galleryImage.addEventListener("error", () => handleImageError(galleryImage));
}

function initImageFallbacks() {
  document.querySelectorAll(".carousel-slide, .project-media img, img[data-fallback]").forEach((image) => {
    image.addEventListener("error", () => handleImageError(image));
  });
}

function initNavbar() {
  const onScroll = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 24);
    }
    if (scrollTopBtn) {
      scrollTopBtn.hidden = window.scrollY < 400;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initFeaturedCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const dotsWrap = document.querySelector(`[data-carousel-dots="${carousel.dataset.carousel}"]`);
    const dots = dotsWrap ? [...dotsWrap.querySelectorAll(".carousel-dot")] : [];
    let index = 0;
    const intervalMs = Number(carousel.dataset.interval) || 3200;

    const goTo = (nextIndex) => {
      slides[index]?.classList.remove("active");
      dots[index]?.classList.remove("active");
      index = (nextIndex + slides.length) % slides.length;
      slides[index]?.classList.add("active");
      dots[index]?.classList.add("active");
    };

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => goTo(dotIndex));
    });

    if (slides.length > 1) {
      setInterval(() => goTo(index + 1), intervalMs);
    }
  });
}

if (prevImage) {
  prevImage.addEventListener("click", () => setActiveImage(activeIndex - 1));
}

if (nextImage) {
  nextImage.addEventListener("click", () => setActiveImage(activeIndex + 1));
}

if (closeGallery) {
  closeGallery.addEventListener("click", closeGalleryModal);
}

if (galleryModal) {
  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
      closeGalleryModal();
    }
  });
}

if (galleryContent) {
  galleryContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

document.addEventListener("keydown", (event) => {
  if (!galleryModal || !galleryModal.open) {
    return;
  }

  if (event.key === "ArrowLeft") {
    setActiveImage(activeIndex - 1);
  }

  if (event.key === "ArrowRight") {
    setActiveImage(activeIndex + 1);
  }

  if (event.key === "Escape") {
    closeGalleryModal();
  }
});

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

initNavbar();
initRevealAnimations();
initImageFallbacks();
initSkillBars();
typeAnimation();
