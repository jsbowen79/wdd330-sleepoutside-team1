import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

<<<<<<< HEAD
const dataSource = new ProductData("tents");
let productsArray = getLocalStorage("so-cart") || [];
=======
const dataSource = new ExternalServices("tents");
const productID = getParam("Id");
>>>>>>> 76cee367dd5ed4a2c1371b1171a7e440795c3e6e

function addProductToCart(product) {
  productsArray.push(product);
  setLocalStorage("so-cart", productsArray);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
