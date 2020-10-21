const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": "support_admin",
  "App-Name": "HipBar-Drinks",
  "hasura-id": "515876",
};

const unassignDaAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://api.hipbar-dev.com/supportman/api/1/deliveryagent/unassign/${reqBody.order_id}`;

  fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { unassignDaAPI };
