import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderTotalPrice } from "./shoppingCart.mjs";
import ExternalServices from "./ExternalServices.mjs";


const checkoutList = getLocalStorage("so-cart");
const count = countItems(checkoutList); 
let total; 
let tax; 
let shippingCost; 
export default class CheckoutProcess {

    displayOrderSummary() {
        function checkoutTemplate(product) {
            return `<tr>
            <td><a href='/product_pages/?Id=${product.Id}' class='checkoutLink'>
            ${product.Name}</a></td>
            <td class='cart-card__price'>$${product.FinalPrice}</td>
            <td class='cart-card__quantity'>${product.Quantity}</td>
            <td class='cart-card__price'>$${(product.FinalPrice *
                    product.Quantity).toFixed(2)}</td>
            </tr>`
        } 
        const tableEL = document.querySelector('#tbody'); 
        let tbodyHTML = ''; 
        checkoutList.forEach((product) => {
            tbodyHTML += checkoutTemplate(product);
        }); 
        tableEL.innerHTML = tbodyHTML; 
    }

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
        const subtotalEL = document.querySelector('#subtotal');
        renderTotalPrice(checkoutList);
    }
    
    calculateTotalWithTax() {
        const taxEL = document.querySelector('#tax'); 
        const shippingEL = document.querySelector('#shipping'); 
        const totalEL = document.querySelector("#total"); 
        const subtotal = Number(document.querySelector('#subtotal').textContent.substring(1)); 
        
        tax = (subtotal * .06);
        shippingCost =10 + (2 * (count - 1)); 
        total = Number(subtotal) + Number(tax) + Number(shippingCost); 

        taxEL.textContent = `$${tax.toFixed(2)}`; 
        shippingEL.textContent = `$${shippingCost.toFixed(2)}`; 
        totalEL.textContent = `$${total.toFixed(2)}`; 

       
       
    }
    createOrder() {
        const itemsList = getLocalStorage("so-cart"); 
        const orderDate = new Date().toISOString(); 
        console.log(document.querySelector('#total')); 
        console.log(document.querySelector('#shipping')); 
        console.log(document.querySelector('#tax'));
        console.log(document.querySelector('#total').textContent); 
        console.log(document.querySelector('#shipping').textContent); 
        console.log(document.querySelector('#tax').textContent); 
        const order = {
            orderDate,
            fname: document.querySelector("#fname").value,
            lname: document.querySelector('#lname').value,
            street: document.querySelector('#street').value,
            city: document.querySelector('#city').value,
            state: document.querySelector('#state').value,
            zip: document.querySelector('#zip').value,
            cardNumber: document.querySelector('#ccnum').value,
            expiration: document.querySelector('#expire').value,
            code: document.querySelector('#code').value,
            items: itemsList.map(item => ({
                id: item.Id,
                name: item.Name,
                price: item.ListPrice,
                quantity: item.Quantity
            })),
            orderTotal: Number(total.toFixed(2)),
            shipping: Number(shippingCost),
            tax: Number(tax.toFixed(2))
        };
        this.checkout(order); 
    }

    async checkout(order) {
        const service = new ExternalServices(); 
        try {
            const result = await service.submitOrder(order); 
            window.location.href = 'success.html'; 
            // setLocalStorage('so-cart', ""); 
            console.log('result= ' + result)
        } catch (err) {
            alertMessage(err.message); 
        }
    }


}
function countItems(checkoutList) {
    let count = 0; 
    checkoutList.forEach(product => {
        count += product.Quantity; 
    });
    return count; 

}