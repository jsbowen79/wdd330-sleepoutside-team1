import {
  getLocalStorage,
  setLocalStorage,
  addToWishlist,
  isInWishlist,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      const productSection = document.querySelector(".product-detail");
      const breadcrumb = document.getElementById("productBreadcrumb");

      if (breadcrumb) {
        breadcrumb.textContent = "Product";
      }

      if (productSection) {
        productSection.innerHTML = `<p>Product not found.</p>`;
      }
      return;
    }

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    const wishlistButton = document.getElementById("addToWishlist");
    if (wishlistButton) {
      wishlistButton.addEventListener(
        "click",
        this.addToWishlistHandler.bind(this)
      );
      this.updateWishlistButton();
    }
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

    if (!wishlistButton || !this.product) return;

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
    const breadcrumb = document.getElementById("productBreadcrumb");

    if (breadcrumb) {
      breadcrumb.textContent =
        this.product.NameWithoutBrand || this.product.Name || "Product";
    }

    productSection.innerHTML = `
      <img
        class="divider"
        src="${this.product.Image || ""}"
        alt="${this.product.Name || "Product image"}"
      />
      <div>
        <h3>${this.product.Brand?.Name || ""}</h3>
        <h2>${this.product.NameWithoutBrand || this.product.Name || ""}</h2>
        <p class="product-card__price">$${this.product.FinalPrice || ""}</p>
        <p class="product__color">${this.product.Colors?.[0]?.ColorName || ""}</p>
        <p class="product__description">
          ${this.product.DescriptionHtmlSimple || ""}
        </p>
        <div class="product-detail__add">
          <button id="addToCart">Add to Cart</button>
          <button id="addToWishlist">Add to Wishlist</button>
        </div>
      </div>
    `;
  }
}