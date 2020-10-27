import {
  fetchCartSummarySuccess,
  fetchCartSummaryFailed,
  fetchCartSummaryProgress,
  fetchUpdateCartSuccess,
  fetchUpdateCartFailed,
  fetchUpdateCartProgress,
} from "./actions";
import { orderSummaryAPI, confirmCartAPI } from "../../../utils";

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
    dispatch(fetchCartSummarySuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchCartSummaryFailed(err));
  };
};

const onSuccessConfirm = (dispatch) => {
  return (data) => {
    dispatch(fetchUpdateCartSuccess(data));
  };
};

const onErrorConfirm = (dispatch) => {
  return (err) => {
    dispatch(fetchUpdateCartFailed(err));
  };
};

const fetchSummary = (reqBody) => {
  // console.clear();
  console.log("[fetch summary]", reqBody);
  return (dispatch) => {
    dispatch(fetchCartSummaryProgress());
    orderSummaryAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const updateCart = (reqBody) => {
  console.log("[update summary]", reqBody);
  return (dispatch) => {
    dispatch(fetchUpdateCartProgress());
    confirmCartAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessConfirm(dispatch),
      onErrorConfirm(dispatch)
    );
  };
};

export { fetchSummary, updateCart };
