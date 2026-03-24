import { getLocalStorage } from "./utils.mjs";
import { renderTotalPrice } from "./shoppingCart.mjs";

const checkoutList = getLocalStorage("so-cart");
const count = countItems(checkoutList); 

export default class CheckoutProcess {

    updateTotals() {
        const checkout = new CheckoutProcess;
        const zipEL = document.querySelector("#zip"); 
        if (zipEL.validity.valid) {
            checkout.calculateTotalWithTax(); 
        }
    }

    
    setExpireRequirement() {
        const currentDate = new Date();
        const expireEL = document.querySelector('#expire');
        expireEL.min = currentDate;
    }

    displaySubtotal() {
        const cartEL = document.querySelector(".product-list");
        const subtotalEL = document.querySelector('.cart-total');
        subtotalEL.hidden = true;
        renderTotalPrice(checkoutList);
        const stringPart = subtotalEL.textContent.substring(7);
        subtotalEL.textContent = "Subtotal: " + stringPart;
        subtotalEL.hidden = false;
    }

    calculateTotalWithTax() {
        console.log("triggered"); 
        const subtotalEL = document.querySelector(".cart-total");
        const taxEL = document.querySelector('#tax'); 
        const shippingEL = document.querySelector('#shipping'); 
        const totalEL = document.querySelector("#total"); 
        const subtotal = subtotalEL.textContent.split('$')[1];
        
        const tax = (subtotal * .06).toFixed(2);
        const shippingCost =10 + (2 * (count - 1)); 
        const total = Number(subtotal) + Number(tax) + Number(shippingCost); 

        taxEL.textContent = `Taxes: $${tax}`; 
        shippingEL.textContent = `Estimated Shipping Charges: $${shippingCost}`; 
        totalEL.textContent = `Order Total: $${total.toFixed(2)}`; 

        
       
    }
}
function countItems(checkoutList) {
    let count = 0; 
    checkoutList.forEach(product => {
        count = + product.Quantity; 
    });
    return count; 
}