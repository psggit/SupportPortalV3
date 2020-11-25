import { authUrl } from "./config";

const authAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${authUrl}/user/account/info`;
  const fetchOptions = {
    method: "get",
    credentials: "include",
    mode: "cors",
    // 'x-hasura-role': 'support_person'
  };
  fetch(URL, fetchOptions)
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => {
      err.json().then((json) => {
        onError(json);
      });
    });
};

export { authAPI };
