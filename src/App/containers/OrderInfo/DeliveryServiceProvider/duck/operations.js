import {
  pushOrderSuccess,
  pushOrderFailed,
  pushOrderProgress,
  restockOrderSuccess,
  restockOrderFailed,
  restockOrderProgress,
  fetchOTPSuccess,
  fetchOTPFailed,
  fetchOTPProgress,
  cancelOrderDSPSuccess,
  cancelOrderDSPFailed,
  cancelOrderDSPProgress,
} from "./action";

import { restockOTPAPI } from "../../../../utils";
import { restockOrderAPI } from "../../../../utils";
import { pushOrderAPI } from "../../../../utils";
import { cancelOrderDSPAPI } from "../../../../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(pushOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(pushOrderFailed(error));
  };
};

const restockSuccess = (dispatch) => {
  return (data) => {
    dispatch(restockOrderSuccess(data));
  };
};

const restockError = (dispatch) => {
  return (error) => {
    dispatch(restockOrderFailed(error));
  };
};

const OTPSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOTPSuccess(data));
  };
};

const OTPError = (dispatch) => {
  return (error) => {
    dispatch(fetchOTPFailed(error));
  };
};

const cancelOrderSuccess = (dispatch) => {
  return (data) => {
    dispatch(cancelOrderDSPSuccess(data));
  };
};

const cancelOrderError = (dispatch) => {
  return (error) => {
    dispatch(cancelOrderDSPFailed(error));
  };
};

const pushOrderOperation = (orderId) => {
  return (dispatch) => {
    dispatch(pushOrderProgress());
    pushOrderAPI(
      orderId,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const restockOrder = (orderId) => {
  return (dispatch) => {
    dispatch(restockOrderProgress());
    restockOrderAPI(
      orderId,
      processResponse(dispatch),
      restockSuccess(dispatch),
      restockError(dispatch)
    );
  };
};

const fetchOTPDSP = (orderId) => {
  return (dispatch) => {
    dispatch(fetchOTPProgress());
    restockOTPAPI(
      orderId,
      processResponse(dispatch),
      OTPSuccess(dispatch),
      OTPError(dispatch)
    );
  };
};

const cancelOrderDSP = (orderId) => {
  return (dispatch) => {
    dispatch(cancelOrderDSPProgress());
    cancelOrderDSPAPI(
      orderId,
      processResponse(dispatch),
      cancelOrderSuccess(dispatch),
      cancelOrderError(dispatch)
    );
  };
};

export { pushOrderOperation, restockOrder, fetchOTPDSP, cancelOrderDSP };
