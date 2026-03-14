import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  let htmlItems;
  if (cartItems) {
    htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    renderTotalPrice(cartItems);
  } else {
    document.querySelector(".product-list").textContent =
      "There are no items in your cart!";
  }
}

function renderTotalPrice(cartList) {
  const totalDisplay = document.querySelector(".cart-footer");
  const totalText = document.querySelector(".cart-total");
  let total = 0;
  cartList.forEach((item) => {
    total += item.FinalPrice;
  });
  if (total != 0) {
    totalText.innerHTML = `Total: $${total.toFixed(2)}`;
    totalDisplay.classList.remove("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
