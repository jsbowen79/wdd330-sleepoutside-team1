const baseURL = import.meta.env.VITE_SERVER_URL; 

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
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
    console.log(response); 
    const data = await convertToJson(response);
    console.log(data); 
    return data.Result
    // product = await this.dataSource.findProductById(this.productId);
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
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
