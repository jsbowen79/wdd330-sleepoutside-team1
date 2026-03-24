import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess;
const zipEL = document.querySelector("#zip"); 
const sendPurchaseEl = document.querySelector('#submit');

zipEL.addEventListener("input", checkout.updateTotals.bind(checkout));
zipEL.addEventListener("change", checkout.updateTotals.bind(checkout));
sendPurchaseEl.addEventListener("click", (e) => {
    e.preventDefault(); 
    checkout.calculateTotalWithTax(); 
    checkout.createOrder(); 
} )


checkout.displayOrderSummary(); 
checkout.setExpireRequirement();  
checkout.displaySubtotal(); 







