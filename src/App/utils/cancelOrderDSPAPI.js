import { apiUrl } from "./config";

const headers = {
  // eslint-disable-next-line prettier/prettier
  "Accept": "application/json",
  "Content-Type": "application/json",
  "App-Name": "HipBar-Drinks",
  "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
  "hasura-id": `${localStorage.getItem("hasura-id")}`,
};

const cancelOrderDSPAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/deliveryman/api/1/support/manualprocess/cancelorder_at_sp/${reqBody}`;
  fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { cancelOrderDSPAPI };