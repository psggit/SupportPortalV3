import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  preponeOrderSuccess,
  preponeOrderFailed,
  preponeOrderProgress,
  fetchDeliverySuccess,
  fetchDeliveryFailed,
  fetchDeliveryProgress,
} from "./actions";
import {
  completeOrderAPI,
  assignWarehouseAPI,
  listDeliveryStatusAPI,
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
    dispatch(fetchOrderSuccess(data));
  };
};

const onErrorAssign = (dispatch) => {
  return (err) => {
    dispatch(preponeOrderFailed(err));
  };
};

const onSuccessAssign = (dispatch) => {
  return (data) => {
    dispatch(preponeOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderFailed(err));
  };
};

const onSuccessDeliveryStatus = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliverySuccess(data));
  };
};

const onErrorDeliveryStatus = (dispatch) => {
  return (err) => {
    dispatch(fetchDeliveryFailed(err));
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

const preponeOrder = (reqBody) => {
  return (dispatch) => {
    dispatch(preponeOrderProgress());
    assignWarehouseAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessAssign(dispatch),
      onErrorAssign(dispatch)
    );
  };
};

const fetchDeliveryStatus = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchDeliveryProgress());
    listDeliveryStatusAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessDeliveryStatus(dispatch),
      onErrorDeliveryStatus(dispatch)
    );
  };
};

export { fetchOrderDetails, preponeOrder, fetchDeliveryStatus };
