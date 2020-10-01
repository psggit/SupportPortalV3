import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
} from "./actions";

import { selectOrder } from "../../Dashboard/duck";
import { fetchOrderInfoAPI } from "../../../utils";

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
  console.log("[onSuccess of fetchCOmpleteOrder]");
  return (data) => {
    dispatch(fetchOrderInfoSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderInfoFailure(err));
  };
};

const fetchOrder = (payload) => {
  console.log("[fetchOrder]");
  return (dispatch) => {
    dispatch(fetchOrderInfoProgress());
    dispatch(selectOrder(payload));
    fetchOrderInfoAPI(
      payload,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchOrder };
