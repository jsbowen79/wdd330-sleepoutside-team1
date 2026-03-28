import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess();
checkout.displayOrderSummary();
loadHeaderFooter();

setLocalStorage("so-cart", []);