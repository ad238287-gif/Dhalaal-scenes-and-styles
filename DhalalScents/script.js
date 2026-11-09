const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
    document.querySelectorAll("#mainNav a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");
  });
});

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let currentFilter = "all";

function updateProducts() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  products.forEach(product => {
    const matchesCategory = currentFilter === "all" || product.dataset.category === currentFilter;
    const matchesSearch = product.dataset.name.toLowerCase().includes(term) ||
      product.dataset.category.includes(term);
    const show = matchesCategory && matchesSearch;
    product.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    updateProducts();
  });
});
searchInput.addEventListener("input", updateProducts);

document.querySelectorAll(".heart").forEach(button => {
  button.addEventListener("click", () => {
    const liked = button.classList.toggle("liked");
    button.textContent = liked ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(liked));
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formNote").textContent =
    "Thanks! This demo form is ready to connect to an email or backend service.";
  event.target.reset();
});
