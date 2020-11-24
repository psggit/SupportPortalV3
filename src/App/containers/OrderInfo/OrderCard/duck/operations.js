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
} from "./actions";
import { cancelOrderSummaryAPI } from "../../../../utils/cancelOrderSummaryAPI";
import { cancelOrderAPI } from "../../../../utils/cancelOrderAPI";
import { deliverOrderReasonAPI } from "../../../../utils/deliverOrderReasonAPI";
import { kycListAPI } from "../../../../utils/kycListAPI";
import { deliverOrderAPI } from "../../../../utils/deliverOrderAPI";
import { cancelReasonAPI } from "../../../../utils";

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
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchCancellationSummaryFailed(json));
    });
  };
};

const onErrorCancel = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(cancelOrderFailure(json));
    });
  };
};

const onErrorDeliver = (dispatch) => {
  // return (err) => {
  //   dispatch(fetchDeliverOrderFailed(err));
  // };
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchDeliverOrderFailed(json));
    });
  };
};

const onErrorKyc = (dispatch) => {
  return (err) => {
    dispatch(fetchKycListFailed(err));
  };
};

const onErrorDeliverOrder = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(deliverOrderFailed(json));
    });
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
  // return (err) => {
  //   dispatch(fetchCancelReasonFailure(err));
  // };
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchCancelReasonFailure(json));
    });
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

export {
  cancelOrderSummary,
  deliverOrderReasons,
  fetchKycList,
  deliverOrder,
  cancelOrder,
  fetchCancelReason,
};
