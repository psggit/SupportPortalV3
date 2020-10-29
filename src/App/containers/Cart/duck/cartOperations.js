import {
  validateOrderSuccess,
  validateOrderFailed,
  validateOrderProgress,
  fetchCartSummarySuccess,
  fetchCartSummaryFailed,
  fetchCartSummaryProgress,
  fetchUpdateCartSuccess,
  fetchUpdateCartFailed,
  fetchUpdateCartProgress,
} from "./actions";
import {
  orderSummaryAPI,
  confirmCartAPI,
  listOrderModificationAPI,
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

const onSuccessValidate = (dispatch) => {
  return (data) => {
    dispatch(validateOrderSuccess(data));
  };
};

const onErrorValidate = (dispatch) => {
  return (err) => {
    dispatch(validateOrderFailed(err));
  };
};

const processResponseConfirm = () => {
  return (res) => {
    return res.json();
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
      processResponseConfirm(dispatch),
      onSuccessConfirm(dispatch),
      onErrorConfirm(dispatch)
    );
  };
};

const validateCart = (reqBody) => {
  console.log("[validate summary]", reqBody);
  return (dispatch) => {
    dispatch(validateOrderProgress());
    listOrderModificationAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessValidate(dispatch),
      onErrorValidate(dispatch)
    );
  };
};

export { fetchSummary, updateCart, validateCart };
