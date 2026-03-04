import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //If  local storage exists add product to a list of items and store the list in local storage using JSON.

  let storedData = getLocalStorage("so-cart");
  if (storedData) {
    storedData.push(product);
    setLocalStorage("so-cart", storedData);
    //If local storage does not exist, create a list, add product to the list and save the list to local storage using JSON.
  } else {
    let cartList = [product];
    setLocalStorage("so-cart", cartList);
  }
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
