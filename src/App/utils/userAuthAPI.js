const URL = `https://auth.hipbar-dev.com/user/account/info`;
const userAuthAPI = (reqBody, process, onSuccess, onError) => {
	fetch(URL, {
		method: "GET",
		credentials: "include",
		mode: "cors",
	})
	.then((res) => process(res))
	.then((data) => onSuccess(data))
	.catch((err) => onError(err));
}

export { userAuthAPI };

