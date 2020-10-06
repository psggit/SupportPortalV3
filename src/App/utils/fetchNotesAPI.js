// https://api.hipbar-dev.com/supportman/api/1/notes/fetch

// Step 1:
// list all notes [Cudtomer, Retailer, DA]
// on click - hit above API to fetch notes

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": "support_admin",
  "App-Name": "HipBar-Drinks",
  "hasura-id": "515947",
};

const fetchNotesAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://api.hipbar-dev.com/supportman/api/1/notes/fetch`;
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

export { fetchNotesAPI };
