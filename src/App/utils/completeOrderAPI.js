// import { apiUrl } from "./config";
const headers = {
  // eslint-disable-next-line prettier/prettier
  "Accept": "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": "support_admin",
  "App-Name": "HipBar-Drinks",
  "hasura-id": "515947",
};

const URL = `https://api.hipbar-dev.com/deliveryman/api/1/fetch-order-details`;
const completeOrderAPI = (reqBody, process, onSuccess, onError) => {
  fetch(URL, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(reqBody),
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { completeOrderAPI };
