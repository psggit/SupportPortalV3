const authAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://auth.hipbar-dev.com/user/account/info`;
  const fetchOptions = {
    method: "get",
    credentials: "include",
    mode: "cors",
    // 'x-hasura-role': 'support_person'
  };
  fetch(URL, fetchOptions)
    .then((res) => process(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { authAPI };
