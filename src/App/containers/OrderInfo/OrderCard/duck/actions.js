import { createAction } from "@reduxjs/toolkit";

const fetchCancelReasonsSuccess = createAction("fetchCancelReasonsSuccess");
const fetchCancelReasonsFailed = createAction("fetchCancelReasonsFailed");
const fetchCancelReasonsProgress = createAction("fetchCancelReasonsProgress");

const fetchKycListSuccess = createAction("fetchKycListSuccess");
const fetchKycListFailed = createAction("fetchKycListFailed");
const fetchKycListProgress = createAction("fetchKycListProgress");

const cancelOrderProgress = createAction("cancelOrderProgress");
const cancelOrderFailure = createAction("cancelOrderFailure");
const cancelOrderSuccess = createAction("cancelOrderSuccess");

const fetchCancellationSummarySuccess = createAction(
  "fetchCancellationSummarySuccess"
);
const fetchCancellationSummaryFailed = createAction(
  "fetchCancellationSummaryFailed"
);
const fetchCancellationSummaryProgress = createAction(
  "fetchCancellationSummaryProgress"
);

export {
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
};
