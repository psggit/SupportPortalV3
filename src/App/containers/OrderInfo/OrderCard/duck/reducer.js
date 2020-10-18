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
});
export { orderDataReducer };
