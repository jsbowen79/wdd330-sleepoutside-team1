import { renderWithTemplate } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function shoppingCartTemplate(product) {
  return `<li class='cart-card divider'>
    <a href='/product_pages/?Id=665HD' class='cart-card__image'>
      <img
        src='${product.Images.PrimarySmall}'
        alt='${product.Name}'
      />
    </a>
    <a href='/product_pages/?Id=665HD'>
      <h2 class='card__name'>${product.Name}</h2>
    </a>
    <p class='cart-card__color'>${product.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: ${product.Quantity}</p>
    <p class='cart-card__price'>$${(product.FinalPrice * product.Quantity).toFixed(2)}</p>
    <div class='deleteButton'>
    <span>❌</span>
    <p class='extractId' hidden>${product.Id}</p>
    </div>
  </li>`;

}

function renderTotalPrice(cartList) {
  const totalDisplay = document.querySelector(".cart-footer");
  const totalText = document.querySelector(".cart-total");
  const deleteEL = document.querySelector('.cartHeader p');
  deleteEL.classList.add('hide');
  totalText.innerHTML = 'There are no Items in your Cart!';
  let total = 0;
  cartList.forEach((item) => {
    const totalItemPrice = item.FinalPrice * item.Quantity;
    total += totalItemPrice;
  });
  if (total != 0) {
    totalText.innerHTML = `Total: $${total.toFixed(2)}`;
    deleteEL.classList.remove('hide');
  }
}


export default class ShoppingCartList {
  constructor(purchaseList, cartElement) {
    this.purchaseList = purchaseList;
    this.cartElement = cartElement;
  }

  renderCart(shoppingCartList) {
    let template = [];

    shoppingCartList.purchaseList.forEach((product) => {
      template += shoppingCartTemplate(product);
    })
    renderWithTemplate(template, shoppingCartList.cartElement);
    this.activateDeleteButtons();
  }

  activateDeleteButtons() {
    const productListEL = document.querySelector('.product-list');
    const deleteELNodes = document.querySelectorAll('.deleteButton span');
    deleteELNodes.forEach((node) => {
      node.addEventListener('click', () => {
        productListEL.innerHTML = '';
        const id = node.nextElementSibling.textContent;
        const shoppingCartList = getLocalStorage('so-cart');
        const newList = shoppingCartList.filter(product => product.Id !== id);
        setLocalStorage('so-cart', newList);
        const newShoppingCartList = new ShoppingCartList(newList, productListEL)
        newShoppingCartList.init();
      })
    })

  }

  async init() {

    this.renderCart(this);
    renderTotalPrice(this.purchaseList);
  }

}
