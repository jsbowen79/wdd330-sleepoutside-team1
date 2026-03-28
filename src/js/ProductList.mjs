import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/?Id=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    <button class="openView">Quick View</button>
  </li>`
}

function productQuickView(product) {
    return `<button class="closeView">X</button>
    <img src="${product.Images.PrimarySmall}" alt="Image of ${product.Name}">
    <h2 class="card__name">${product.Brand.Name} – ${product.NameWithoutBrand}</h2>
    <p class="product-card__price">List price: <strong>$${product.ListPrice}</strong></p>
    <p class="product__color">Colors available: <strong>${product.Colors[0].ColorName}</strong></p>
    <p class="available"><strong>In Stock</strong></p>
    `
}

function openQuickView(data) {
        const openButtons = document.getElementsByClassName("openView");
        for (let i = 0; i < openButtons.length; i++){
            const openButton = openButtons[i];
            openButton.addEventListener('click', () => {
                renderQuickView(data[i]);
            })
        }
}

function renderQuickView(product) {
    const modal = document.querySelector(".view");
    modal.innerHTML = "";
    renderWithTemplate(productQuickView(product), modal);
    modal.showModal();

    const closeButton = document.querySelector(".closeView");
    closeButton.addEventListener('click', () => {
        modal.close();
    })
}

export default class ProductList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, this.dataSource);
        openQuickView(this.dataSource);
    }

    async init() {
        this.renderList(this);
    }
}
