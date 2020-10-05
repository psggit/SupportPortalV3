import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
} from "./actions";
import { completeOrderAPI } from "../../../utils";

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
    dispatch(fetchOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderFailed());
  };
};

const fetchOrderDetails = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderProgress());
    completeOrderAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchOrderDetails };
