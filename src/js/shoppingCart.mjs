import { renderWithTemplate } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function shoppingCartTemplate(product) {
  return `<tr data-id="${product.Id}" data-name="${product.Name}">
    <td>
    <a href='/product_pages/?Id=${product.Id}' class='cart-card__image'>
      <img
        src='${product.Images.PrimarySmall}'
        alt='${product.Name}'
      />
    </a></td>
    <td>
    <a href='/product_pages/?Id=${product.Id}'>
      <h2 class='card__name'>${product.Name}</h2>
    </a></td>
    <td><p class='cart-card__color'>${product.Colors[0].ColorName}</p></td>
    <td class="buttonContainer">
    <span class="addItem">+</span>
    <p class='cart-card__quantity'>${product.Quantity}</p>
    <span class="subtractItem">-</span>
    </td>
    <td><p class='cart-card__price'>$${(product.FinalPrice * product.Quantity).toFixed(2)}</p></td>
    
    <td class="deleteButton" id=${product.Id}>❌</td>
    </tr>`;

}

export function renderTotalPrice(cartList) {
  const totalDisplay = document.querySelector(".cart-footer");
  const subtotalEL = document.querySelector("#subtotal"); 
  const emptyCartEL = document.querySelector("#products");
  let checkoutEL = document.querySelector("a.checkout");
  if (cartList.length == 0) {
    emptyCartEL.innerHTML = 'There are no Items in your Cart!';
  }
  let total = 0;
  cartList.forEach((item) => {
    const totalItemPrice = item.FinalPrice * item.Quantity;
    total += totalItemPrice;
  });
  if (total != 0) {
    subtotalEL.innerHTML = `$${total.toFixed(2)}`;
    if (!window.location.href.includes('checkout')) {
      if (!checkoutEL) {
        checkoutEL = document.createElement('a'); 
        checkoutEL.classList.add('checkout'); 
        checkoutEL.href=('/checkout/index.html')
        checkoutEL.innerHTML = "<button class='checkout'>Purchase Now</button>";
          totalDisplay.appendChild(checkoutEL); 
        }
      }
  }
}


export default class ShoppingCartList {
  constructor(purchaseList, cartElement) {
    this.purchaseList = purchaseList;
    this.cartElement = cartElement;
    this.activateEvents();
  }

  renderCart(shoppingCartList) {
    let template = [];

    shoppingCartList.purchaseList.forEach((product) => {
      template += shoppingCartTemplate(product);
    })
    template += `<tr class="subtotal">
    <td ></td>
    <td></td>
    <td></td>
    <td><strong>Subtotal</strong></td>
    <td id="subtotal"></td>
    </tr>`;
    renderWithTemplate(template, shoppingCartList.cartElement);
  }




  activateEvents() {
    const tableEL = document.querySelector('#cartTable'); 
    console.log(this); 
    tableEL.addEventListener("click", (e) => {
      const row = e.target.closest("tr"); 
      if (!row) return; 

      const productId = row.dataset.id; 

      if (e.target.classList.contains("addItem")) {
        this.updateQuantity(productId, 1); 
      }

      if (e.target.classList.contains("subtractItem")) {
        this.updateQuantity(productId, -1)
      }

      if (e.target.classList.contains("deleteButton")) {
        this.removeItem(productId)
      }
    })
  }

  updateQuantity(productId, change) {
    let shoppingList = this.purchaseList;
    let empty = null;

    shoppingList.forEach((product) => {
      if (product.Id == productId) {
        Number(product.Quantity += change);
        if (product.Quantity == 0) {
          empty = product.Id;
        }
      }
    });
    if (empty) {
      shoppingList = shoppingList.filter( item => item.Id !== empty )
      renderTotalPrice(shoppingList); 
    }
    setLocalStorage("so-cart", shoppingList); 
    this.cartElement.innerHTML = ""; 
    this.init();
  }

  removeItem(productId) {
    this.purchaseList = this.purchaseList.filter(
      item => item.Id !== productId); 
    setLocalStorage("so-cart", this.purchaseList); 
      this.cartElement.innerHTML = ""; 
      this.init(); 
    }
  

  async init() {
    this.renderCart(this);
    renderTotalPrice(this.purchaseList);
  }
}


