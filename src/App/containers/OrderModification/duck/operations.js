/* eslint-disable no-unused-vars */
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderInProgress,
  sendSMSInProgress,
  sendSMSSuccess,
  sendSMSFailed,
  fetchCancelCartSuccess,
  fetchCancelCartFailed,
  fetchCancelCartProgress,
  fetchUpdatedStatusSuccess,
  fetchUpdatedStatusFailed,
  fetchUpdatedStatusProgress,
} from "./action";

import {
  listOrderModificationAPI,
  sendSMSAPI,
  cancelOrderModificationAPI,
  fetchRequestStatusAPI,
} from "../../../utils";

const processResponse = () => {
  // console.log("[processResponse]");
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

const onsendSMSSuccess = (dispatch) => {
  return (data) => {
    dispatch(sendSMSSuccess(data));
  };
};

const onsendSMSError = (dispatch) => {
  return (err) => {
    dispatch(sendSMSFailed(err));
  };
};

const processResponseSMS = () => {
  return (res) => {
    return res.json();
  };
};

const sendSMSOperation = (payload) => {
  return (dispatch) => {
    dispatch(sendSMSInProgress());
    sendSMSAPI(
      payload,
      processResponseSMS(dispatch),
      onsendSMSSuccess(dispatch),
      onsendSMSError(dispatch)
    );
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderFailed(err));
  };
};

const fetchListOrderModification = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderInProgress());
    listOrderModificationAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const onSuccessCancel = (dispatch) => {
  return (data) => {
    dispatch(fetchCancelCartSuccess(data));
  };
};

const onErrorCancel = (dispatch) => {
  return (err) => {
    dispatch(fetchCancelCartFailed(err));
  };
};

const cancelOrderRequest = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchCancelCartProgress());
    cancelOrderModificationAPI(
      reqBody,
      processResponseSMS(dispatch),
      onSuccessCancel(dispatch),
      onErrorCancel(dispatch)
    );
  };
};

const onSuccessStatus = (dispatch) => {
  return (data) => {
    dispatch(fetchUpdatedStatusSuccess(data));
  };
};

const onErrorStatus = (dispatch) => {
  return (err) => {
    // console.log("error", err);
    dispatch(fetchUpdatedStatusFailed(err));
  };
};

const fetchUpdatedStatus = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchUpdatedStatusProgress());
    fetchRequestStatusAPI(
      reqBody,
      processResponseSMS(dispatch),
      onSuccessStatus(dispatch),
      onErrorStatus(dispatch)
    );
  };
};

export {
  fetchListOrderModification,
  sendSMSOperation,
  cancelOrderRequest,
  fetchUpdatedStatus,
};
