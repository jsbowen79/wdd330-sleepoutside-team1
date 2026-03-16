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
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

//retrieve parameters from URL

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param).replace(".html", "") || urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear == true) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data = null, callback = null) {
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
  const headerTemplate = await loadTemplate('header.html'); 
  const footerTemplate = await loadTemplate('footer.html');
  
  const headerEL = document.querySelector("#mainHeader"); 
  const footerEL = document.querySelector("#mainFooter"); 
  renderWithTemplate(headerTemplate, headerEL); 
  renderWithTemplate(footerTemplate, footerEL); 
}



