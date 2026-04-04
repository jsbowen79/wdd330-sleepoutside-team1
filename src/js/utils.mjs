// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// retrieve parameters from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);

  if (!value) {
    return null;
  }

  return value.replace(".html", "");
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear == true) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data = null,
  callback = null
) {
  // console.log (`Element: ${parentElement}, template: ${template}, data: ${data}, callback: ${callback} `)
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(filename) {
  const res = await fetch(`/partials/${filename}`);
  return await res.text();
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("header.html");
  const footerTemplate = await loadTemplate("footer.html");

  const headerEL = document.querySelector("#mainHeader");
  const footerEL = document.querySelector("#mainFooter");
  renderWithTemplate(headerTemplate, headerEL);
  renderWithTemplate(footerTemplate, footerEL);
}

// WishList

const WISHLIST_KEY = "so-wishlist";

export function getWishlist() {
  return getLocalStorage(WISHLIST_KEY) || [];
}

export function saveWishlist(items) {
  setLocalStorage(WISHLIST_KEY, items);
}

export function addToWishlist(product) {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.Id === product.Id);

  if (!exists) {
    wishlist.push(product);
    saveWishlist(wishlist);
  }
}

export function removeFromWishlist(productId) {
  const wishlist = getWishlist().filter((item) => item.Id !== productId);
  saveWishlist(wishlist);
}

export function isInWishlist(productId) {
  return getWishlist().some((item) => item.Id === productId);
}