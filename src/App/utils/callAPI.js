import { apiUrl } from "./config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
};

const callAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/supportman/api/1/call`;
  fetch(URL, {
    method: "POST",
    headers: headers,
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(reqBody),
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { callAPI };
