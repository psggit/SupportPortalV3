import { createAction } from "@reduxjs/toolkit";

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

const fetchCancelReasonProgress = createAction("fetchCancelReasonProgress");
const fetchCancelReasonFailure = createAction("fetchCancelReasonFailure");
const fetchCancelReasonSuccess = createAction("fetchCancelReasonSuccess");

const verifyPaymentProgress = createAction("verifyPaymentProgress");
const verifyPaymentFailed = createAction("verifyPaymentFailed");
const verifyPaymentSuccess = createAction("verifyPaymentSuccess");

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
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  verifyPaymentProgress,
  verifyPaymentFailed,
  verifyPaymentSuccess,
};
