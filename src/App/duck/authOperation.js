import {
  authorizationProgress,
  authorizationFailed,
  authorizationSuccess,
  markActivityProgress,
  markActivityFailed,
  markActivitySuccess,
} from "../containers/Login/duck/actions";
import { authAPI } from "../utils";
import { createSession } from "../utils";
import { markActivityAPI } from "../utils";

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
    dispatch(authorizationSuccess(data));
    createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(authorizationFailed(err));
  };
};

const markActivityOnSuccess = (dispatch) => {
  return (data) => {
    dispatch(markActivitySuccess(data));
  };
};

const markActivityOnError = (dispatch) => {
  return (err) => {
    dispatch(markActivityFailed(err));
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

const markActivity = () => {
  return (dispatch) => {
    dispatch(markActivityProgress());
    markActivityAPI(
      processResponse(dispatch),
      markActivityOnSuccess(dispatch),
      markActivityOnError(dispatch)
    );
  };
};

export { validateAuth, markActivity };
