import { apiUrl } from "./config";
console.log("apiURL from loginAPI", apiUrl);
const headers = {"Accept": "application/json", "Content-Type": "application/json" };

// const api = `/deliveryman/api/1/support/send-login-email`;
// const URL = `https://${apiUrl}.${process.env.BASE_URL}${api}`;
const URL = `https://api.hipbar-dev.com/deliveryman/api/1/support/send-login-email`;
console.log(ARGS_BASE_DOMAIN);
const loginAPI = (reqBody, process, onSuccess, onError) => {
  fetch(URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(reqBody),
  })
    .then((res) => {
	    console.log("[loginAPI]", res);
	    process(res);
    }).then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { loginAPI };

