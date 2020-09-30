// import { apiUrl } from "./config";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-hasura-role": "support_admin",
  "App-Name": "HipBar-Drinks",
  "hasura-id": "515947",
};

const authAPI = (reqBody, process, onSuccess, onError) => {
  const URL = `https://hipbar-dev.com/user/account/info`;
  const fetchOptions = {
    method: "get",
    credentials: "include",
    mode: "cors",
    // 'x-hasura-role': 'support_person'
  };

  fetch(URL, fetchOptions)
    .then((response) => {
      if (response.status !== 200) {
        console.log(
          `Looks like there was a problem. Status Code: ${response.status}`
        );
        // if (location.pathname !== "/login") {
        //   location.href = "/login";
        // }
        return;
      }
      response.json().then((data) => {
        console.log("[AUTH API]");
        console.log(data);
        // createSession(data);
        // setIsLoggedIn(true);
        // if (!location.pathname.includes("home")) {
        //   location.href = "/home/dashboard";
        // }
      });
    })
    .catch((err) => {
      console.log("Fetch Error :-S", err);
    });
};

export { authAPI };
