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
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchOrderFailed(json));
    });
  };
};

const fetchOrderDetails = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderProgress(reqBody));
    console.log("completeOrderAPI ", reqBody);
    completeOrderAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchOrderDetails };
