import ProductData from "./ProductData.mjs";
import { ProductList } from "./ProductList.mjs";

const source = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList(source, listElement);
productList.init();

