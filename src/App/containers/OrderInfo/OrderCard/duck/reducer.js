/* eslint-disable no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCancellationSummarySuccess,
  fetchCancellationSummaryFailed,
  fetchCancellationSummaryProgress,
  fetchKycListSuccess,
  fetchKycListFailed,
  fetchKycListProgress,
  fetchCancelReasonsSuccess,
  fetchCancelReasonsFailed,
  fetchCancelReasonsProgress,
  cancelOrderProgress,
  cancelOrderFailure,
  cancelOrderSuccess,
} from "./actions";

const initialValue = {
  cancelReasons: null,
  kycList: null,
  cancellationSummary: null,
  fetchCancellationSummarySuccess: false,
  fetchCancellationSummaryFailed: false,
  fetchCancellationSummaryProgress: false,
  fetchKycListSuccess: false,
  fetchKycListFailed: false,
  fetchKycListProgress: false,
  fetchCancelReasonsSuccess: false,
  fetchCancelReasonsFailed: false,
  fetchCancelReasonsProgress: false,
  cancelOrderData: null,
  cancelOrderProgress: false,
  cancelOrderFailure: false,
  cancelOrderSuccess: false,
  errorMsg: "",
};
const orderDataReducer = createReducer(initialValue, {
  [fetchCancelReasonsSuccess]: (state, data) => ({
    ...state,
    retailerNotesData: data.payload,
    fetchSuccess: true,
    fetchFailed: false,
    fetchProgress: false,
    errorMsg: "",
  }),
  [fetchCancelReasonsFailed]: (state) => ({
    ...state,
    fetchSuccess: false,
    fetchFailed: true,
    fetchProgress: false,
    errorMsg: "Something went wrong Please try again!",
  }),
  [fetchCancelReasonsProgress]: (state) => ({
    ...state,
    fetchProgress: true,
  }),
  [cancelOrderSuccess]: (state, data) => ({
    ...state,
    cancelOrderData: data.payload,
    cancelOrderSuccess: true,
    cancelOrderFailure: false,
    cancelOrderProgress: false,
    errorMsg: "",
  }),
  [cancelOrderFailure]: (state) => ({
    ...state,
    cancelOrderSuccess: false,
    cancelOrderFailure: true,
    cancelOrderProgress: false,
    errorMsg: "Something went wrong Please try again!",
  }),
  [cancelOrderProgress]: (state) => ({
    ...state,
    cancelOrderProgress: true,
  }),
});
export { orderDataReducer };
