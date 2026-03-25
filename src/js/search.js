const searchInput = document.getElementById("productSearch");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  productCards.forEach((card) => {
    const brand = card.querySelector(".card__brand").textContent.toLowerCase();
    const name = card.querySelector(".card__name").textContent.toLowerCase();

    if (brand.includes(searchValue) || name.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});