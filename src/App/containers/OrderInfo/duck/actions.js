import { createAction } from "@reduxjs/toolkit";

const fetchOrderInfoProgress = createAction("fetchOrderInfoProgress");
const fetchOrderInfoFailure = createAction("fetchOrderInfoFailure");
const fetchOrderInfoSuccess = createAction("fetchOrderInfoSuccess");

const fetchCancelReasonProgress = createAction("fetchCancelReasonProgress");
const fetchCancelReasonFailure = createAction("fetchCancelReasonFailure");
const fetchCancelReasonSuccess = createAction("fetchCancelReasonSuccess");

export {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
};
