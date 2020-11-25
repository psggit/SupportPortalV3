import { apiUrl } from "./config";

const assignIssueAPI = (reqBody, process, onSuccess, onError) => {
  const URL = ` https://${apiUrl}/deliveryman/api/1/support/issue/assignmanual/${reqBody.orderId}/${reqBody.issueId}/${reqBody.supportPersonId}`;
  const headers = {
    // eslint-disable-next-line prettier/prettier
    "Accept": "application/json",
    "Content-Type": "application/json",
    "App-Name": "HipBar-Drinks",
    "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
    "hasura-id": `${localStorage.getItem("hasura-id")}`,
  };
  fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => {
      err.json().then((json) => {
        onError(json);
      });
    });
};

export { assignIssueAPI };
