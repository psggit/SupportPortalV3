import { createAction } from "@reduxjs/toolkit";

const fetchOrderInfoProgress = createAction("fetchOrderInfoProgress");
const fetchOrderInfoFailure = createAction("fetchOrderInfoFailure");
const fetchOrderInfoSuccess = createAction("fetchOrderInfoSuccess");

const fetchCancelReasonProgress = createAction("fetchCancelReasonProgress");
const fetchCancelReasonFailure = createAction("fetchCancelReasonFailure");
const fetchCancelReasonSuccess = createAction("fetchCancelReasonSuccess");

const createNotesProgress = createAction("createNotesProgress");
const createNotesFailure = createAction("createNotesFailure");
const createNotesSuccess = createAction("createNotesSuccess");

const fetchActivityLogsProgress = createAction("fetchActivityLogsProgress");
const fetchActivityLogsFailed = createAction("fetchActivityLogsFailed");
const fetchActivityLogsSuccess = createAction("fetchActivityLogsSuccess");

const connectCallProgress = createAction("connectCallProgress");
const connectCallFailed = createAction("connectCallFailed");
const connectCallSuccess = createAction("connectCallSuccess");

export {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  createNotesProgress,
  createNotesFailure,
  createNotesSuccess,
  fetchActivityLogsProgress,
  fetchActivityLogsFailed,
  fetchActivityLogsSuccess,
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
};
