import { apiUrl } from "./config";

const cancelOrderModificationAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/orderman/api/1/order/modify/cancel/${reqBody}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "App-Name": "HipBar-Drinks",
    "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
    "hasura-id": `${localStorage.getItem("hasura-id")}`,
  };
  fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { cancelOrderModificationAPI };
