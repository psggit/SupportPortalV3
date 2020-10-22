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

const connectCallProgress = createAction("connectCallProgress");
const connectCallFailed = createAction("connectCallFailed");
const connectCallSuccess = createAction("connectCallSuccess");

const fetchIssueTypesProgress = createAction("fetchIssueTypesProgress");
const fetchIssueTypesFailed = createAction("fetchIssueTypesFailed");
const fetchIssueTypesSuccess = createAction("fetchIssueTypesSuccess");

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
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
  fetchIssueTypesProgress,
  fetchIssueTypesFailed,
  fetchIssueTypesSuccess,
};
