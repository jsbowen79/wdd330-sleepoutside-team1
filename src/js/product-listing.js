import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// get category from URL
const category = getParam('category');

// create data source
const dataSource = new ProductData();

// get where products will show
const listElement = document.querySelector('.product-list');

// create product list
const myList = new ProductList(category, dataSource, listElement);

// run it
myList.init();
