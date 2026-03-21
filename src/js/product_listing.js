import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const titleEL = document.querySelector('.products h2'); 
const listElement = document.querySelector(".product-list");
const category = getParam("category") || "tents"; 
const capitalizedCategory = category => (category[0].toUpperCase() + category.slice(1)).toString(); 
titleEL.innerHTML = `Top Products: ${capitalizedCategory(category)}`; 
const projectData = new ProductData(); 
const source = await projectData.getData(category); 
console.log(source); 
const productList = new ProductList(source, listElement);


loadHeaderFooter();
productList.init();
