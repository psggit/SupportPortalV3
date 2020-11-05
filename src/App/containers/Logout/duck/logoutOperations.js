import { logoutSuccess, logoutFailed, logoutProgress } from "./action";
import { logoutAPI } from "../../../utils/logoutAPI";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccessLogout = (dispatch) => {
  return (data) => {
    dispatch(logoutSuccess(data));
  };
};

const onErrorLogout = (dispatch) => {
  return () => {
    dispatch(logoutFailed());
  };
};

const logout = (reqBody) => {
  return (dispatch) => {
    dispatch(logoutProgress());
    logoutAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessLogout(dispatch),
      onErrorLogout(dispatch)
    );
  };
};

const logoutSession = () => {
  document.cookie = "dinoisses=";
  console.log("logout");
};

export { logoutSession, logout };
