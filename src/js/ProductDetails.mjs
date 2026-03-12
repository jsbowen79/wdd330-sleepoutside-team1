
import { setLocalStorage, getLocalStorage, qs } from "./utils.mjs";


export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = [];
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        ("Loaded product:", this.product);
        this.RenderProductDetails();
        console.log('content rendered')
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        const productsArray = getLocalStorage("so-cart") || [];
        productsArray.push(this.product);
        setLocalStorage("so-cart", productsArray);
    }

    RenderProductDetails() {

        const productBrandEl = qs('h3');
        const productNameEL = qs('h2');
        const productImageEL = qs('#productImage');
        const priceEL = qs('.product-card__price');
        const colorEL = qs('.product__color');
        const longProductDescriptionEL = qs('.product__description');
        
        productBrandEl.textContent = this.product.Brand.Name; 
        productNameEL.textContent = this.product.NameWithoutBrand; 
        productImageEL.src = this.product.Image; 
        productImageEL.alt = this.product.NameWithoutBrand; 
        priceEL.textContent = `$${this.product.ListPrice}`; 
        colorEL.textContent = this.product.Colors[0].ColorName; 

        const temp = document.createElement('div');
        temp.innerHTML = this.product.DescriptionHtmlSimple; 
        longProductDescriptionEL.textContent = temp.textContent; 

        qs('#addToCart').dataset.id = this.product.Id;

    }
}