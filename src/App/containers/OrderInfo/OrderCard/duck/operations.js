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
  fetchCancellationSummarySuccess,
  fetchCancellationSummaryFailed,
  fetchCancellationSummaryProgress,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  verifyPaymentProgress,
  verifyPaymentFailed,
  verifyPaymentSuccess,
} from "./actions";
import { cancelOrderSummaryAPI } from "../../../../utils/cancelOrderSummaryAPI";
import { cancelOrderAPI } from "../../../../utils/cancelOrderAPI";
import { deliverOrderReasonAPI } from "../../../../utils/deliverOrderReasonAPI";
import { kycListAPI } from "../../../../utils/kycListAPI";
import { deliverOrderAPI } from "../../../../utils/deliverOrderAPI";
import { cancelReasonAPI } from "../../../../utils";
import { verifyPaymentAPI } from "../../../../utils/verifyPaymentAPI";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccessCancelOrder = (dispatch) => {
  return (data) => {
    dispatch(fetchCancellationSummarySuccess(data));
  };
};

const onSuccessCancel = (dispatch) => {
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
  return (error) => {
    dispatch(fetchCancellationSummaryFailed(error));
  };
};

const onErrorCancel = (dispatch) => {
  return (error) => {
    dispatch(cancelOrderFailure(error));
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
  return (error) => {
    dispatch(deliverOrderFailed(error));
  };
};

const cancelOrderSummary = (payload) => {
  return (dispatch) => {
    dispatch(fetchCancellationSummaryProgress());
    cancelOrderSummaryAPI(
      payload,
      processResponse(dispatch),
      onSuccessCancelOrder(dispatch),
      onErrorCancelOrder(dispatch)
    );
  };
};

const cancelOrder = (payload) => {
  return (dispatch) => {
    dispatch(cancelOrderProgress());
    cancelOrderAPI(
      payload,
      processResponse(dispatch),
      onSuccessCancel(dispatch),
      onErrorCancel(dispatch)
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

const onErrorCancelReason = (dispatch) => {
  return (err) => {
    dispatch(fetchCancelReasonFailure(err));
  };
};

const onSuccessCancelReason = (dispatch) => {
  return (data) => {
    dispatch(fetchCancelReasonSuccess(data));
  };
};

const fetchCancelReason = (payload) => {
  return (dispatch) => {
    dispatch(fetchCancelReasonProgress());
    cancelReasonAPI(
      payload,
      processResponse(dispatch),
      onSuccessCancelReason(dispatch),
      onErrorCancelReason(dispatch)
    );
  };
};

const verifyPayment = (payload) => {
  return (dispatch) => {
    dispatch(verifyPaymentProgress());
    verifyPaymentAPI(
      payload,
      processResponse(dispatch),
      onSuccessPayment(dispatch),
      onErrorPayment(dispatch)
    );
  };
};

const onSuccessPayment = (dispatch) => {
  return (data) => {
    dispatch(verifyPaymentSuccess(data));
  };
};

const onErrorPayment = (dispatch) => {
  return (err) => {
    dispatch(verifyPaymentFailed(err));
  };
};

export {
  cancelOrderSummary,
  deliverOrderReasons,
  fetchKycList,
  deliverOrder,
  cancelOrder,
  fetchCancelReason,
  verifyPayment,
};
