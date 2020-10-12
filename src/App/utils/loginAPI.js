import { apiUrl } from "./config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// const api = `/deliveryman/api/1/support/send-login-email`;
// const URL = `https://${apiUrl}.${process.env.BASE_URL}${api}`;
const loginAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/deliveryman/api/1/support/send-login-email`;
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
