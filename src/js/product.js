import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
let productsArray = getLocalStorage("so-cart") || [];

function addProductToCart(product) {
  // Check if product already exists in cart
  const existingProduct = productsArray.find(item => item.Id === product.Id);
  
  if (existingProduct) {
    // If product exists, increment quantity
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    console.log(`Increased quantity of ${product.Name} to ${existingProduct.quantity}`);
  } else {
    // If product doesn't exist, add it with quantity 1
    product.quantity = 1;
    productsArray.push(product);
    console.log(`Added new product: ${product.Name}`);
  }
  
  // Save updated cart to localStorage
  setLocalStorage("so-cart", productsArray);
  
  // Optional: Show feedback to user
  alert(`${product.Name} added to cart!`);
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