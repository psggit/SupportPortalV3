import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
} from "./actions";
import { orderSummaryAPI } from "../../../utils";

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
    dispatch(fetchOrderFailed(err));
  };
};

const fetchSummary = (reqBody) => {
  console.log("[fetch summary]", reqBody);
  return (dispatch) => {
    dispatch(fetchOrderProgress());
    orderSummaryAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchSummary };
