import { apiUrl } from "./config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "App-Name": "HipBar-Drinks",
  "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
  "hasura-id": `${localStorage.getItem("hasura-id")}`,
};

const cancelReasonAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/deliveryman/api/1/support/cancel-reason`;
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

export { cancelReasonAPI };
