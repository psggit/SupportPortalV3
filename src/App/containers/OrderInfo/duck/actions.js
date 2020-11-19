import { createAction } from "@reduxjs/toolkit";

const fetchOrderInfoProgress = createAction("fetchOrderInfoProgress");
const fetchOrderInfoFailure = createAction("fetchOrderInfoFailure");
const fetchOrderInfoSuccess = createAction("fetchOrderInfoSuccess");

const createNotesProgress = createAction("createNotesProgress");
const createNotesFailure = createAction("createNotesFailure");
const createNotesSuccess = createAction("createNotesSuccess");

const connectCallProgress = createAction("connectCallProgress");
const connectCallFailed = createAction("connectCallFailed");
const connectCallSuccess = createAction("connectCallSuccess");

const fetchIssueTypesProgress = createAction("fetchIssueTypesProgress");
const fetchIssueTypesFailed = createAction("fetchIssueTypesFailed");
const fetchIssueTypesSuccess = createAction("fetchIssueTypesSuccess");

const submitIssueProgress = createAction("submitIssueProgress");
const submitIssueFailed = createAction("submitIssueFailed");
const submitIssueSuccess = createAction("submitIssueSuccess");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  createNotesProgress,
  createNotesFailure,
  createNotesSuccess,
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
  fetchIssueTypesProgress,
  fetchIssueTypesFailed,
  fetchIssueTypesSuccess,
  submitIssueProgress,
  submitIssueFailed,
  submitIssueSuccess,
  resetOnUnmount,
};
