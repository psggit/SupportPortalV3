import { apiUrl } from "./config";

const pushOrderAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/deliveryman/api/1/support/manualprocess/push_order/${reqBody}`;
  const headers = {
    // eslint-disable-next-line prettier/prettier
    "Accept": "application/json",
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

export { pushOrderAPI };
