import { loginSuccess, loginFailed, loginProgress } from "./actions";
import { loginAPI } from "../../../utils";
import { createSession } from "../../../utils/session";

const processResponse = () => {
  console.log("[processResponse]");
  return (res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("invalid params");
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
    dispatch(loginFailed(err));
  };
};

const sendLoginEmail = (email) => {
  console.log("[sendLoginEmail]");
  let reqBody = {
    email_id: email,
    redirect_url: "https://ts-support.hipbar-dev.com/home/dashboard",
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
