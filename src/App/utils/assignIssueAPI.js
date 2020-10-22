import { apiUrl } from "./config";

const headers = {
  // eslint-disable-next-line prettier/prettier
  "Accept": "application/json",
  "Content-Type": "application/json",
  "App-Name": "HipBar-Drinks",
  "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`,
  "hasura-id": `${localStorage.getItem("hasura-id")}`,
};

const assignIssueAPI = (reqBody, process, onSuccess, onError) => {
  const URL = ` https://${apiUrl}/supportman/api/1/issue/assignmanual/${reqBody.orderId}/${reqBody.issueId}/${reqBody.supportPersonId}`;
  console.log(URL);
  fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { assignIssueAPI };