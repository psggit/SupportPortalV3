/* eslint-disable no-undef */
import { loginSuccess, loginFailed, loginProgress } from "./actions";
import { loginAPI } from "../../../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(loginSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(loginFailed(err));
  };
};
// console.log(ARGS_BUILD_ENV);

const getRedirectURL = () => {
  // let redirectURL = "http://localhost:8080/dashboard"; //local
  // let redirectURL = "https://support.hipbar-dev.com/dashboard"; //live
  // console.log(process.env.NODE_ENV);
  let redirectURL = "";
  switch (ARGS_BUILD_ENV) {
    case "local":
      return (redirectURL =
        "http://support-local.hipbar-dev.com:8080/dashboard");
    case "dev":
      return (redirectURL = "https://support.hipbar-dev.com/dashboard");
    case "production":
      return (redirectURL = "https://support-v2.hipbar.com/dashboard");
  }
  return redirectURL;
};

const sendLoginEmail = (email) => {
  let reqBody = {
    email_id: email,
    redirect_url: getRedirectURL(),
  };
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
