// import { apiUrl } from "./config";

const headers = { "Content-Type": "application/json" };

// const api = `/deliveryman/api/1/support/send-login-email`;
// const URL = `https://${apiUrl}.${process.env.BASE_URL}${api}`;
const URL = `https://api.hipbar-dev.com/supportman/api/1/send-login-email`;

const loginAPI = (reqBody, process, onSuccess, onError) => {
  console.log(reqBody);
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

