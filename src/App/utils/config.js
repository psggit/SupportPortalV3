export const authUrl = `auth.${process.env.BASE_URL}`;
export const apiUrl = `api.${process.env.BASE_URL}`;
export const stockPriceURL = `retailer.${process.env.BASE_URL}/Api/stockandprice`;
export const customerURL = `customer.${process.env.BASE_URL}`;

console.log("config::: ", apiUrl);
console.log("config::: ", authUrl);
console.log("stockPriceURL:: ", stockPriceURL);
