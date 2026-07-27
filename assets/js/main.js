"use strict";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

const setHeaderState = () => header?.classList.toggle("scrolled", window.scrollY > 20);
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  menu.classList.toggle("open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || menuToggle?.getAttribute("aria-expanded") !== "true") return;
  menuToggle.click();
  menuToggle.focus();
});

menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menu?.classList.remove("open");
  document.body.style.overflow = "";
}));

const formatValue = (value) => value % 1 ? value.toFixed(1) : Math.round(value).toLocaleString("en-IN");
const countUp = (element) => {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    element.textContent = `${formatValue(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add("visible");
  if (entry.target.matches(".stat")) countUp(entry.target.querySelector("[data-count]"));
  observer.unobserve(entry.target);
}), { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

const filters = document.querySelectorAll("[data-filter]");
const productSearch = document.querySelector("[data-product-search]");
const productCards = document.querySelectorAll(".tyre-card");
const productCount = document.querySelector("[data-product-count]");
const emptyResults = document.querySelector("[data-empty-results]");
let activeCategory = "all";

const filterProducts = () => {
  const query = productSearch?.value.trim().toLowerCase() || "";
  let visible = 0;
  productCards.forEach((card) => {
    const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
    const queryMatch = !query || card.dataset.search.includes(query);
    const show = categoryMatch && queryMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (productCount) productCount.textContent = `Showing ${visible} tyre${visible === 1 ? "" : "s"}`;
  if (emptyResults) emptyResults.hidden = visible !== 0;
};

filters.forEach((filter) => filter.addEventListener("click", () => {
  activeCategory = filter.dataset.filter;
  filters.forEach((button) => button.classList.toggle("active", button === filter));
  filterProducts();
}));
productSearch?.addEventListener("input", filterProducts);

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.innerHTML = "↑";
document.body.append(backToTop);

const updateBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 650);
updateBackToTop();
window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelectorAll(".button, .nav-cta").forEach((button) => button.addEventListener("click", (event) => {
  const ripple = document.createElement("span");
  const box = button.getBoundingClientRect();
  ripple.className = "ripple";
  ripple.style.left = `${event.clientX - box.left}px`;
  ripple.style.top = `${event.clientY - box.top}px`;
  button.append(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}));

const parallaxItems = document.querySelectorAll(".hero-image, .inner-hero");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const applyParallax = () => {
  if (prefersReducedMotion) return;
  parallaxItems.forEach((item) => {
    const offset = Math.max(-34, Math.min(34, window.scrollY * -0.045));
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
};
applyParallax();
window.addEventListener("scroll", applyParallax, { passive: true });
