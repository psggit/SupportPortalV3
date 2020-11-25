import { apiUrl } from "./config";

const acitivityLogsAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://${apiUrl}/supportman/api/1/activitylogs`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
  };
  fetch(URL, {
    method: "POST",
    headers: headers,
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(reqBody),
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => {
      err.json().then((json) => {
        onError(json);
      });
    });
};

export { acitivityLogsAPI };
