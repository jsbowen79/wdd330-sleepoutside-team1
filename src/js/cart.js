import { getLocalStorage } from "./utils.mjs";

<<<<<<< HEAD
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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
=======
loadHeaderFooter();
const cartEL = document.querySelector(".cartTBody");
const shoppingCart = getLocalStorage("so-cart");
const shoppingCartList = new ShoppingCartList(shoppingCart, cartEL);
shoppingCartList.init();
>>>>>>> 76cee367dd5ed4a2c1371b1171a7e440795c3e6e
