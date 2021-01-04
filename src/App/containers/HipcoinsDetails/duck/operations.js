import {
  triggerEmailSuccess,
  triggerEmailFailed,
  triggerEmailInProgress,
} from "./action";
// import { createSession } from "../../../utils";
import { triggerEmailAPI } from "../../../utils/triggerEmailAPI";

const processResponse = () => {
  return (res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    // console.log("[onSuccess] data", data);
    dispatch(triggerEmailSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(triggerEmailFailed(err));
  };
};

const triggerEmail = (payload) => {
  return (dispatch) => {
    dispatch(triggerEmailInProgress());
    triggerEmailAPI(
      payload,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { triggerEmail };
