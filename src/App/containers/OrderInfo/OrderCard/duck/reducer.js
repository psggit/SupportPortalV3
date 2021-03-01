import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCancellationSummarySuccess,
  fetchCancellationSummaryFailed,
  fetchCancellationSummaryProgress,
  fetchKycListSuccess,
  fetchKycListFailed,
  fetchKycListProgress,
  cancelOrderProgress,
  cancelOrderFailure,
  cancelOrderSuccess,
  fetchDeliverOrderProgress,
  fetchDeliverOrderFailed,
  fetchDeliverOrderSuccess,
  deliverOrderProgress,
  deliverOrderFailed,
  deliverOrderSuccess,
  resetOnUnmount,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  verifyPaymentProgress,
  verifyPaymentFailed,
  verifyPaymentSuccess,
} from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

const initialValue = {
  cancelReasons: null,
  deliverOrderData: null,
  deliverData: null,
  kycListData: null,
  cancellationSummary: null,
  fetchCancellationSummarySuccess: false,
  fetchCancellationSummaryFailed: false,
  fetchCancellationSummaryProgress: false,
  fetchKycListSuccess: false,
  fetchKycListFailed: false,
  fetchKycListProgress: false,
  cancelOrderSummaryData: null,
  cancelOrderProgress: false,
  cancelOrderFailure: false,
  cancelOrderSuccess: false,
  deliverOrderProgress: false,
  deliverOrderFailed: false,
  deliverOrderSuccess: false,
  errorMsg: "",
  successMsg: "",
  errorMsgCancel: "",
  errorMsgSummary: "",
  fetchCancelReasonProgress: false,
  fetchCancelReasonFailure: false,
  fetchCancelReasonSuccess: false,
  verifyPaymentProgress: false,
  verifyPaymentFailed: false,
  verifyPaymentSuccess: false,
};
const orderDataReducer = createReducer(initialValue, {
  // [fetchCancelReasonsSuccess]: (state, data) => ({
  //   ...state,
  //   retailerNotesData: data.payload,
  //   fetchSuccess: true,
  //   fetchFailed: false,
  //   fetchProgress: false,
  //   errorMsg: "",
  // }),
  // [fetchCancelReasonsFailed]: (state) => ({
  //   ...state,
  //   fetchSuccess: false,
  //   fetchFailed: true,
  //   fetchProgress: false,
  //   errorMsgCancel: "Something went wrong. Please try again!",
  // }),
  // [fetchCancelReasonsProgress]: (state) => ({
  //   ...state,
  //   fetchProgress: true,
  //   fetchFailed: false,
  //   fetchSuccess: false,
  // }),
  [fetchDeliverOrderSuccess]: (state, data) => ({
    ...state,
    deliverOrderData: data.payload,
    fetchDeliverOrderSuccess: true,
    fetchDeliverOrderFailed: false,
    fetchDeliverOrderProgress: false,
    errorMsg: "",
  }),
  [fetchDeliverOrderFailed]: (state, data) => {
    return {
      ...state,
      fetchDeliverOrderSuccess: false,
      fetchDeliverOrderFailed: true,
      fetchDeliverOrderProgress: false,
      errorMsg: setErrorMessage(data),
    };
  },
  [fetchDeliverOrderProgress]: (state) => ({
    ...state,
    fetchDeliverOrderProgress: true,
    fetchDeliverOrderSuccess: false,
    fetchDeliverOrderFailed: false,
  }),

  [fetchKycListSuccess]: (state, data) => ({
    ...state,
    kycListData: data.payload,
    fetchKycListSuccess: true,
    fetchKycListFailed: false,
    fetchKycListProgress: false,
    errorMsg: "",
  }),
  [fetchKycListFailed]: (state, data) => ({
    ...state,
    fetchKycListSuccess: false,
    fetchKycListFailed: true,
    fetchKycListProgress: false,
    errorMsg: setErrorMessage(data),
  }),
  [fetchKycListProgress]: (state) => ({
    ...state,
    fetchKycListProgress: true,
    fetchKycListSuccess: false,
    fetchKycListFailed: false,
  }),
  [fetchCancellationSummarySuccess]: (state, data) => ({
    ...state,
    cancelOrderSummaryData: data.payload,
    fetchCancellationSummarySuccess: true,
    fetchCancellationSummaryFailed: false,
    cancelOrderProgress: false,
    errorMsg: "",
  }),
  [fetchCancellationSummaryFailed]: (state, data) => ({
    ...state,
    fetchCancellationSummarySuccess: false,
    fetchCancellationSummaryFailed: true,
    cancelOrderProgress: false,
    errorMsgSummary: setErrorMessage(data),
  }),
  [fetchCancellationSummaryProgress]: (state) => ({
    ...state,
    fetchCancellationSummaryProgress: true,
    fetchCancellationSummarySuccess: false,
    fetchCancellationSummaryFailed: false,
  }),
  [deliverOrderSuccess]: (state, data) => ({
    ...state,
    deliverData: data.payload,
    deliverOrderSuccess: true,
    deliverOrderFailed: false,
    deliverOrderProgress: false,
    errorMsg: "",
    successMsg: data.payload,
  }),
  [deliverOrderFailed]: (state, data) => {
    return {
      ...state,
      deliverOrderSuccess: false,
      deliverOrderFailed: true,
      deliverOrderProgress: false,
      errorMsg: setErrorMessage(data),
    };
  },
  [deliverOrderProgress]: (state) => ({
    ...state,
    deliverOrderProgress: true,
    deliverOrderSuccess: false,
    deliverOrderFailed: false,
  }),

  [cancelOrderSuccess]: (state, data) => ({
    ...state,
    deliverData: data.payload,
    cancelOrderSuccess: true,
    cancelOrderFailure: false,
    cancelOrderProgress: false,
    errorMsg: "",
    successMsg: data.payload,
  }),
  [cancelOrderFailure]: (state, data) => ({
    ...state,
    cancelOrderSuccess: false,
    cancelOrderFailure: true,
    cancelOrderProgress: false,
    errorMsg: setErrorMessage(data),
  }),
  [cancelOrderProgress]: (state) => ({
    ...state,
    cancelOrderProgress: true,
    cancelOrderSuccess: false,
    cancelOrderFailure: false,
  }),
  [fetchCancelReasonProgress]: (state) => ({
    ...state,
    fetchCancelReasonProgress: true,
    fetchCancelReasonFailure: false,
    fetchCancelReasonSuccess: false,
  }),
  [fetchCancelReasonFailure]: (state, data) => {
    return {
      ...state,
      fetchCancelReasonProgress: false,
      fetchCancelReasonFailure: true,
      fetchCancelReasonSuccess: false,
      errorMsgCancel: setErrorMessage(data),
    };
  },
  [fetchCancelReasonSuccess]: (state, data) => {
    return {
      ...state,
      fetchCancelReasonProgress: false,
      fetchCancelReasonFailure: false,
      fetchCancelReasonSuccess: true,
      cancelReasons: data.payload,
    };
  },

  [verifyPaymentSuccess]: (state, data) => ({
    ...state,
    verifyPaymentSuccess: true,
    verifyPaymentFailed: false,
    verifyPaymentProgress: false,
    errorMsg: "",
    successMsg: data.payload,
  }),
  [verifyPaymentFailed]: (state, data) => ({
    ...state,
    verifyPaymentSuccess: false,
    verifyPaymentFailed: true,
    verifyPaymentProgress: false,
    errorMsg: setErrorMessage(data),
  }),
  [verifyPaymentProgress]: (state) => ({
    ...state,
    verifyPaymentProgress: true,
    verifyPaymentSuccess: false,
    verifyPaymentFailed: false,
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});
export { orderDataReducer };
