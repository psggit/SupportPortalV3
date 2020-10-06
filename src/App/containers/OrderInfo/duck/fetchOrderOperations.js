import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
} from "./actions";

import { selectOrder } from "../../Dashboard/duck";
import { orderInfoAPI, cancelReasonAPI } from "../../../utils";

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

export { fetchOrder, fetchCancelReason };
