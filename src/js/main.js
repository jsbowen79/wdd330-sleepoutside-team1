import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  // Load header and footer templates
  await loadHeaderFooter();
  
  // Initialize product list
  const source = new ProductData("tents");
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList(source, listElement);
  productList.init();
});