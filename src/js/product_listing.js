import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
const category = getParam("category") || "tents"; 
const projectData = new ProductData(); 
const source = await projectData.getData(category); 
const productList = new ProductList(source, listElement);

loadHeaderFooter();
productList.init();
