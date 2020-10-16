import {
  authorizationProgress,
  authorizationFailed,
  authorizationSuccess,
} from "../containers/Login/duck/actions";
import { authAPI } from "../utils";
import { createSession } from "../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(authorizationSuccess(data));
    createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(authorizationFailed(err));
  };
};

const validateAuth = () => {
  return (dispatch) => {
    dispatch(authorizationProgress());
    authAPI(
      null,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { validateAuth };
