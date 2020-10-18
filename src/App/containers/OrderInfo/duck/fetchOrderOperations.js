import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  createNotesProgress,
  createNotesFailure,
  createNotesSuccess,
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
} from "./actions";

import { selectOrder } from "../../Dashboard/duck";
import {
  orderInfoAPI,
  cancelReasonAPI,
  createNotesAPI,
  callAPI,
} from "../../../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const processResponseCall = () => {
  return (res) => {
    if (res.status === 204) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOrderInfoSuccess(data));
  };
};

const onSuccessCancel = (dispatch) => {
  return (data) => {
    dispatch(fetchCancelReasonSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderInfoFailure(err));
  };
};

const onErrorCancel = (dispatch) => {
  return (err) => {
    dispatch(fetchCancelReasonFailure(err));
  };
};

const fetchOrder = (payload) => {
  return (dispatch) => {
    dispatch(fetchOrderInfoProgress());
    dispatch(selectOrder(payload));
    orderInfoAPI(
      payload,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const fetchCancelReason = (payload) => {
  return (dispatch) => {
    dispatch(fetchCancelReasonProgress());
    cancelReasonAPI(
      payload,
      processResponse(dispatch),
      onSuccessCancel(dispatch),
      onErrorCancel(dispatch)
    );
  };
};

const onSuccessNotes = (dispatch) => {
  return (data) => {
    dispatch(createNotesSuccess(data));
  };
};

const onErrorNotes = (dispatch) => {
  return (err) => {
    dispatch(createNotesFailure(err));
  };
};

const createNotes = (payload) => {
  return (dispatch) => {
    dispatch(createNotesProgress());
    createNotesAPI(
      payload,
      processResponse(dispatch),
      onSuccessNotes(dispatch),
      onErrorNotes(dispatch)
    );
  };
};

const onSuccessCall = (dispatch) => {
  return (data) => {
    console.log("[onSuccessCall]");
    dispatch(connectCallSuccess(data));
  };
};

const onErrorCall = (dispatch) => {
  return (err) => {
    console.log("[onErrorCall]", err);
    dispatch(connectCallFailed(err));
  };
};

const connectCall = (reqBody) => {
  return (dispatch) => {
    dispatch(connectCallProgress());
    callAPI(reqBody, processResponseCall, onSuccessCall, onErrorCall);
  };
};

export { fetchOrder, fetchCancelReason, createNotes, connectCall };
