import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
} from "./actions";
import { fetchCompleteOrderAPI } from "../../../utils";

const processResponse = () => {
  console.log("[processResponse]");
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  console.log("[onSuccess]");
  return (data) => {
    console.log("data");
    console.log(data);
    dispatch(fetchOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchOrderFailed());
  };
};

const fetchOrderDetails = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderProgress());
    fetchCompleteOrderAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchOrderDetails };
