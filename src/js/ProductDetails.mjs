import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let productsArray = getLocalStorage("so-cart") || [];
    productsArray.push(this.product);
    setLocalStorage("so-cart", productsArray);
  }

  renderProductDetails() {
    const productSection = document.querySelector(".product-detail");

    productSection.innerHTML = `
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />
      <div>
        <h3>${this.product.Brand.Name}</h3>
        <h2>${this.product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart">Add to Cart</button>
        </div>
      </div>
    `;
  }
}