// Utility functions

// Function to render a single template
export function renderWithTemplate(template, parentElement, data, callback) {
  // Clone the template content
  const clone = template.content.cloneNode(true);
  
  // If data exists, apply it to the clone
  if (data) {
    // If callback exists, use it to process the clone with data
    if (callback) {
      callback(clone, data);
    }
  }
  
  // Clear parent element and append the clone
  parentElement.innerHTML = '';
  parentElement.appendChild(clone);
}

// Function to load HTML template from a file
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load template from ${path}`);
    }
    const html = await response.text();
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
  } catch (error) {
    console.error('Error loading template:', error);
    throw error;
  }
}

// Function to load header and footer templates and render them
export async function loadHeaderFooter() {
  try {
    // Load the header template
    const headerTemplate = await loadTemplate('/partials/header.html');
    const headerElement = document.getElementById('mainHeader');
    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
    }
    
    // Load the footer template
    const footerTemplate = await loadTemplate('/partials/footer.html');
    const footerElement = document.getElementById('mainFooter');
    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    }
  } catch (error) {
    console.error('Error loading header/footer:', error);
  }
}

// Original renderListWithTemplate function (kept for backwards compatibility)
export function renderListWithTemplate(template, parentElement, list, position = 'afterbegin', clear = true, callback) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  
  const htmlStrings = list.map((item, index) => {
    const clone = template.content.cloneNode(true);
    if (callback) {
      callback(clone, item, index);
    }
    return clone;
  });
  
  htmlStrings.forEach(html => {
    parentElement.insertAdjacentHTML(position, html);
  });
}

// Function to get parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Function to render a list of items with a template
export function renderList(templateFn, parentElement, list, position = 'afterbegin', clear = true) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  
  const htmlStrings = list.map(templateFn);
  htmlStrings.forEach(html => {
    parentElement.insertAdjacentHTML(position, html);
  });
}