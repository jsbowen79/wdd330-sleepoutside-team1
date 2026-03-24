import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess;
const zipEL = document.querySelector("#zip"); 

zipEL.addEventListener("input", checkout.updateTotals.bind(checkout));
zipEL.addEventListener("change", checkout.updateTotals.bind(checkout));





checkout.setExpireRequirement();  
checkout.displaySubtotal(); 
