import {
  fetchLiveDataProgress,
  fetchLiveDataSuccess,
  fetchLiveDataFailure,
  resetOnUnmount,
} from "./actions";
import { orderTrackingAPI } from "../../../utils";

const processResponse = () => {
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
  return (data) => {
    dispatch(fetchLiveDataSuccess(data));
  };
};

const onError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchLiveDataFailure(json));
    });
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
