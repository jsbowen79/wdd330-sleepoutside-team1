import {
  getLocalStorage,
  setLocalStorage,
  addToWishlist,
  isInWishlist,
} from "./utils.mjs";

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

    document
      .getElementById("addToWishlist")
      .addEventListener("click", this.addToWishlistHandler.bind(this));

    this.updateWishlistButton();
  }

  addToCart() {
    let productsArray = getLocalStorage("so-cart") || [];
    productsArray.push(this.product);
    setLocalStorage("so-cart", productsArray);
  }

  addToWishlistHandler() {
    addToWishlist(this.product);
    this.updateWishlistButton();
  }

  updateWishlistButton() {
    const wishlistButton = document.getElementById("addToWishlist");

    if (isInWishlist(this.product.Id)) {
      wishlistButton.textContent = "Added to Wishlist";
      wishlistButton.disabled = true;
    } else {
      wishlistButton.textContent = "Add to Wishlist";
      wishlistButton.disabled = false;
    }
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
          <button id="addToWishlist">Add to Wishlist</button>
        </div>
      </div>
    `;
  }
}