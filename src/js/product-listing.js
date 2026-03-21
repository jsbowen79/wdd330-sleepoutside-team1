import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");
const source = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, source, listElement);
loadHeaderFooter();
productList.init();
