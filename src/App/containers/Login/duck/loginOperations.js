import { loginSuccess, loginFailed, loginProgress } from "./actions";
import { loginAPI } from "../../../utils";
import { createSession } from "../../../utils";

const processResponse = () => {
  console.log("[processResponse]");
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  console.log("[onSuccess]");
  return (data) => {
    console.log("data");
    console.log(data);
    dispatch(loginSuccess(data));
    createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    createSession(null);
    dispatch(loginFailed());
  };
};

const getRedirectURL = () => {
  let redirectURL = "http://localhost:8080/dashboard";
  switch (process.env.NODE_ENV) {
    case "local":
      return (redirectURL =
        "http://support-local.hipbar-dev.com:8001/home/dashboard");
    case "development":
      return (redirectURL = "https://ts-support.hipbar-dev.com/home/dashboard");
    case "production":
      return (redirectURL = "https://support.hipbar.com/home/dashboard");
  }
  console.log(redirectURL);
  return redirectURL;
};

const sendLoginEmail = (email) => {
  console.log("[sendLoginEmail]");
  let reqBody = {
    email_id: email,
    redirect_url: getRedirectURL(),
  };
  console.log(reqBody);
  return (dispatch) => {
    dispatch(loginProgress());
    loginAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { sendLoginEmail };
