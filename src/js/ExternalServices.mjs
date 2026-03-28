const baseURL = import.meta.env.VITE_SERVER_URL; 

async function convertToJson(res) {
  const response = await res.json(); 
  if (res.ok) {
    return response;
  } else {
    const errorMessage = typeof response === 'object'
      ? JSON.stringify(response)
      : String(response); 
    throw {name: 'ExternalServicesError', message: errorMessage};
  }
}

export default class ExternalServices {
  constructor() {
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`); 
    
    const data = await convertToJson(response);
    
    return data.Result; 
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result
  }

  async submitOrder(order) {
    console.log("order " + order); 
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order)
    };
    console.log(JSON.stringify(order, null, 2));

    return await fetch(`${baseURL}checkout`, options).then(convertToJson)
  
  }
}
