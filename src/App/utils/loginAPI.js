import { apiUrl } from "./config";

const loginAPI = (reqBody, process, onSuccess, onError) => {
  // console.log("loginAPI ", reqBody);
  const URL = `https://${apiUrl}/supportman/api/1/send-login-email`;
  // const URL = `https://${apiUrl}/deliveryman/api/1/support/send-login-email`;
  const headers = {
    // eslint-disable-next-line prettier/prettier
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
  fetch(URL, {
    method: "POST",
    headers: headers,
    // credentials: "include",
    body: JSON.stringify(reqBody),
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((error) => {
      error.json().then((json) => {
        onError(json);
      });
    });
};

export { loginAPI };
