import {
  cancelOrderProgress,
  cancelOrderFailure,
  cancelOrderSuccess,
} from "./actions";
import { cancelOrderAPI } from "../../../../utils/cancelOrderAPI";

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

const onSuccessCancelOrder = (dispatch) => {
  return (data) => {
    dispatch(cancelOrderSuccess(data));
  };
};

const onErrorCancelOrder = (dispatch) => {
  return (err) => {
    dispatch(cancelOrderFailure(err));
  };
};

const cancelOrder = (payload) => {
  return (dispatch) => {
    dispatch(cancelOrderProgress());
    cancelOrderAPI(
      payload,
      processResponse(dispatch),
      onSuccessCancelOrder(dispatch),
      onErrorCancelOrder(dispatch)
    );
  };
};

export { cancelOrder };
