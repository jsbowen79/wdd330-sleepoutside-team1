import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/?Id=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`
}

export default class ProductList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, this.dataSource);
    }
    async init() {
        this.renderList(this);
    }
}