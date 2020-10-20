import {
  cancelOrderProgress,
  cancelOrderFailure,
  cancelOrderSuccess,
  fetchKycListFailed,
  fetchKycListProgress,
  fetchKycListSuccess,
  fetchDeliverOrderFailed,
  fetchDeliverOrderSuccess,
  fetchDeliverOrderProgress,
  deliverOrderProgress,
  deliverOrderFailed,
  deliverOrderSuccess,
} from "./actions";
import { cancelOrderAPI } from "../../../../utils/cancelOrderAPI";
import { deliverOrderReasonAPI } from "../../../../utils/deliverOrderReasonAPI";
import { kycListAPI } from "../../../../utils/kycListAPI";
import { deliverOrderAPI } from "../../../../utils/deliverOrderAPI";

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

const onSuccessDeliver = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliverOrderSuccess(data));
  };
};

const onSuccessKyc = (dispatch) => {
  return (data) => {
    dispatch(fetchKycListSuccess(data));
  };
};

const onSuccessDeliverOrder = (dispatch) => {
  return (data) => {
    dispatch(deliverOrderSuccess(data));
  };
};

const onErrorCancelOrder = (dispatch) => {
  return (err) => {
    dispatch(cancelOrderFailure(err));
  };
};

const onErrorDeliver = (dispatch) => {
  return (err) => {
    dispatch(fetchDeliverOrderFailed(err));
  };
};

const onErrorKyc = (dispatch) => {
  return (err) => {
    dispatch(fetchKycListFailed(err));
  };
};

const onErrorDeliverOrder = (dispatch) => {
  return (err) => {
    dispatch(deliverOrderFailed(err));
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

const deliverOrderReasons = (payload) => {
  return (dispatch) => {
    dispatch(fetchDeliverOrderProgress());
    deliverOrderReasonAPI(
      payload,
      processResponse(dispatch),
      onSuccessDeliver(dispatch),
      onErrorDeliver(dispatch)
    );
  };
};

const fetchKycList = () => {
  return (dispatch) => {
    dispatch(fetchKycListProgress());
    kycListAPI(
      processResponse(dispatch),
      onSuccessKyc(dispatch),
      onErrorKyc(dispatch)
    );
  };
};

const deliverOrder = (payload) => {
  return (dispatch) => {
    dispatch(deliverOrderProgress());
    deliverOrderAPI(
      payload,
      processResponse(dispatch),
      onSuccessDeliverOrder(dispatch),
      onErrorDeliverOrder(dispatch)
    );
  };
};

export { cancelOrder, deliverOrderReasons, fetchKycList, deliverOrder };
