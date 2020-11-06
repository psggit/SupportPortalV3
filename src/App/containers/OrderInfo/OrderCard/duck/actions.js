import { createAction } from "@reduxjs/toolkit";

const fetchCancelReasonsSuccess = createAction("fetchCancelReasonsSuccess");
const fetchCancelReasonsFailed = createAction("fetchCancelReasonsFailed");
const fetchCancelReasonsProgress = createAction("fetchCancelReasonsProgress");

const fetchKycListSuccess = createAction("fetchKycListSuccess");
const fetchKycListFailed = createAction("fetchKycListFailed");
const fetchKycListProgress = createAction("fetchKycListProgress");

const fetchDeliverOrderSuccess = createAction("fetchDeliverOrderSuccess");
const fetchDeliverOrderFailed = createAction("fetchDeliverOrderFailed");
const fetchDeliverOrderProgress = createAction("fetchDeliverOrderProgress");

const cancelOrderProgress = createAction("cancelOrderProgress");
const cancelOrderFailure = createAction("cancelOrderFailure");
const cancelOrderSuccess = createAction("cancelOrderSuccess");

const deliverOrderProgress = createAction("deliverOrderProgress");
const deliverOrderFailed = createAction("deliverOrderFailed");
const deliverOrderSuccess = createAction("deliverOrderSuccess");

const resetOnUnmount = createAction("resetOnUnmount");

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
  fetchDeliverOrderProgress,
  fetchDeliverOrderSuccess,
  fetchDeliverOrderFailed,
  deliverOrderProgress,
  deliverOrderFailed,
  deliverOrderSuccess,
  resetOnUnmount,
};
