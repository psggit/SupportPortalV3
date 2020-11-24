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
} from "./actions";

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
    console.log("fetchDeliverOrderFailed", data.payload.status);
    return {
      ...state,
      fetchDeliverOrderSuccess: false,
      fetchDeliverOrderFailed: true,
      fetchDeliverOrderProgress: false,
      errorMsg: data.payload.status,
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
  [fetchKycListFailed]: (state) => ({
    ...state,
    fetchKycListSuccess: false,
    fetchKycListFailed: true,
    fetchKycListProgress: false,
    errorMsg: "Something went wrong. Please try again!",
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
    errorMsgSummary: data.payload.message,
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
      errorMsg: data.payload.message,
    }
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
    errorMsg: data.payload.message,
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
    const errorMessage =
      typeof data.payload.message === undefined ||
      typeof data.payload.message === "undefined"
        ? "Something went wrong. Try again later."
        : data.payload.message;
    return {
      ...state,
      fetchCancelReasonProgress: false,
      fetchCancelReasonFailure: true,
      fetchCancelReasonSuccess: false,
      errorMsgCancel: errorMessage,
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
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});
export { orderDataReducer };
