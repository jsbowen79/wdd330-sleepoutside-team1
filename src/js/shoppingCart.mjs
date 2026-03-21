import { renderWithTemplate } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";


function shoppingCartTemplate(product) {
    
    return `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${product.Image}'
        alt='${product.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${product.Name}</h2>
    </a>
    <p class='cart-card__color'>${product.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${product.FinalPrice}</p>
  </li>`;
    
}

function renderTotalPrice(cartList) {
    const totalDisplay = document.querySelector(".cart-footer");
    const totalText = document.querySelector(".cart-total");
    let total = 0;
    cartList.forEach((item) => {
      total += item.FinalPrice;
    });
    if (total != 0) {
      totalText.innerHTML = `Total: $${total.toFixed(2)}`;
      totalDisplay.classList.remove("hide");
    }
}

export default class ShoppingCartList {
    constructor(purchaseList, cartElement) {
        this.purchaseList = purchaseList; 
        this.cartElement = cartElement; 
    }

    renderCart(shoppingCartList) {
        console.log('inside renderCart');
        let template; 

        shoppingCartList.purchaseList.forEach((product) => {
            template += shoppingCartTemplate(product); 
            console.log(`template: ${template}`); 
        })
        renderWithTemplate(template, shoppingCartList.cartElement); 
    }
     
      
    async init() {
        if (this.purchaseList) {
            this.renderCart(this); 
            renderTotalPrice(this.purchaseList);
          } else {
            document.querySelector('.product-list').textContent ="There are no items in your cart!";
          }
    }
}
