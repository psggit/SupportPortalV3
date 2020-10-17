const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": "support_admin",
  "App-Name": "HipBar-Drinks",
  "hasura-id": "515876",
};

const consumerGiftSoaAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://api.hipbar-dev.com/supportman/api/1/soa/gift/history/${reqBody.customer_contact_number}`;
  fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { consumerGiftSoaAPI };
