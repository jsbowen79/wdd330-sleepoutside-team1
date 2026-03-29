import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess();
const zipEL = document.querySelector("#zip");
const sendPurchaseEl = document.querySelector("#submit");

zipEL.addEventListener("input", checkout.updateTotals.bind(checkout));
zipEL.addEventListener("change", checkout.updateTotals.bind(checkout));
sendPurchaseEl.addEventListener("click", (e) => {
  const form = document.getElementById("orderForm");
  e.preventDefault();
  if (form.checkValidity()) {
    checkout.calculateTotalWithTax();
    checkout.createOrder();
  } else {
    form.reportValidity();
    checkout.checkForValidation();
  }
});

checkout.displayOrderSummary();
checkout.setExpireRequirement();
checkout.displaySubtotal();
