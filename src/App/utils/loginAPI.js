import { apiUrl } from "./config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const loginAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/supportman/api/1/send-login-email`;
  // const URL = `https://${apiUrl}/deliveryman/api/1/support/send-login-email`;
  fetch(URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(reqBody),
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { loginAPI };
