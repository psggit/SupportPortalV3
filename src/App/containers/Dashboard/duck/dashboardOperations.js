import {
  fetchOrderProgress,
  preponeOrderSuccess,
  preponeOrderFailed,
  preponeOrderProgress,
  fetchDeliverySuccess,
  fetchDeliveryFailed,
  fetchDeliveryProgress,
} from "./actions";
import { assignWarehouseAPI, listDeliveryStatusAPI } from "../../../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onErrorAssign = (dispatch) => {
  return (data) => {
    data.json().then((err) => {
      dispatch(preponeOrderFailed(err));
    });
  };
};

const onSuccessAssign = (dispatch) => {
  return (data) => {
    dispatch(preponeOrderSuccess(data));
  };
};

const onSuccessDeliveryStatus = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliverySuccess(data));
  };
};

const onErrorDeliveryStatus = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchDeliveryFailed(json));
    });
  };
};

const fetchOrderDetails = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderProgress(reqBody));
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
