import { getWishlist, removeFromWishlist, loadHeaderFooter } from "./utils.mjs";

function renderWishlistItem(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h3>${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="remove-wishlist" data-id="${product.Id}">Remove</button>
    </li>
  `;
}

function renderWishlist() {
  const wishlistContainer = document.getElementById("wishlist-list");
  const wishlist = getWishlist();

  if (!wishlist.length) {
    wishlistContainer.innerHTML = `<p>Your wishlist is empty.</p>`;
    return;
  }

  wishlistContainer.innerHTML = wishlist.map(renderWishlistItem).join("");

  document.querySelectorAll(".remove-wishlist").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      removeFromWishlist(productId);
      renderWishlist();
    });
  });
}

loadHeaderFooter();
renderWishlist();