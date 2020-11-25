import {
  fetchLiveDataProgress,
  fetchLiveDataSuccess,
  fetchLiveDataFailure,
  resetOnUnmount,
} from "./actions";
import { orderTrackingAPI } from "../../../utils";

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
    dispatch(fetchLiveDataSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchLiveDataFailure(error));
  };
};

const fetchDeliveryStatus = (orderId) => {
  return (dispatch) => {
    dispatch(fetchLiveDataProgress());
    orderTrackingAPI(
      orderId,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const resetOnUnmountFunction = () => {
  return (dispatch) => {
    dispatch(resetOnUnmount());
  };
};

export { fetchDeliveryStatus, resetOnUnmountFunction };
