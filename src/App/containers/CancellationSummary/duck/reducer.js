import { createReducer } from "@reduxjs/toolkit";
import {
  triggerRefundSuccess,
  triggerRefundFailed,
  triggerRefundProgress,
} from "./action";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialValue = {
  triggerRefundSuccess: false,
  triggerRefundFailed: false,
  triggerRefundProgress: false,
  errorMsg: "Something went wrong, please try again",
  successMsg: "",
};

const cancellationSummaryReducer = createReducer(initialValue, {
  [triggerRefundSuccess]: (state, data) => {
    return {
      ...state,
      triggerRefundProgress: false,
      triggerRefundFailed: false,
      triggerRefundSuccess: true,
      errorMsg: "",
      successMsg: data.payload,
    };
  },
  [triggerRefundFailed]: (state, error) => ({
    ...state,
    triggerRefundProgress: false,
    triggerRefundFailed: true,
    triggerRefundSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [triggerRefundProgress]: (state) => ({
    ...state,
    triggerRefundProgress: true,
    triggerRefundFailed: false,
    triggerRefundSuccess: false,
  }),
  // [resetOnUnmount]: () => ({
  //   ...initialValue,
  // }),
});

export { cancellationSummaryReducer };
