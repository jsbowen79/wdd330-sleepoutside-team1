import { loadHeaderFooter, setLocalStorage } from "../js/utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";

const checkout = new CheckoutProcess();
checkout.displayOrderSummary();
loadHeaderFooter();

setLocalStorage("so-cart", []);
