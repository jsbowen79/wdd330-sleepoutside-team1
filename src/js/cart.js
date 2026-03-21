import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCartList from "./shoppingCart.mjs";

loadHeaderFooter();
const cartEL = document.querySelector(".product-list");
const shoppingCart = getLocalStorage("so-cart");
const shoppingCartList = new ShoppingCartList(shoppingCart, cartEL);
shoppingCartList.init();
