import {
  triggerRefundSuccess,
  triggerRefundFailed,
  triggerRefundProgress,
} from "./action";
import { triggerRefundAPI } from "../../../utils";

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
    dispatch(triggerRefundSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(triggerRefundFailed(error));
  };
};

const triggerRefund = (reqBody) => {
  // console.log("[validate summary]", reqBody);
  return (dispatch) => {
    dispatch(triggerRefundProgress());
    triggerRefundAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { triggerRefund };
