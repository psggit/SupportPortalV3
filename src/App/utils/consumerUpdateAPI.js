import { customerURL } from "./config";

const consumerUpdateAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${customerURL}/consumer/update`;
  const headers = {
    // eslint-disable-next-line prettier/prettier
    "Accept": "application/json",
    "Content-Type": "application/json",
    "App-Name": "HipBar-Drinks",
    "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
    "hasura-id": `${localStorage.getItem("hasura-id")}`,
  };
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

export { consumerUpdateAPI };
