// import { apiUrl } from "./config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": "support_admin",
  "App-Name": "HipBar-Drinks",
  "hasura-id": "515868",
};

const genresAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://retailer.hipbar-dev.com/Api/stockandprice/listing/brands`;
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

export { genresAPI };
