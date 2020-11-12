import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccessfull = createAction("fetchNotesSuccessfull");
const fetchNotesFailure = createAction("fetchNotesFailure");
const fetchNotesInProgress = createAction("fetchNotesInProgress");
const fetchIssueListSuccess = createAction("fetchIssueListSuccess");
const fetchIssueListFailure = createAction("fetchIssueListFailure");
const fetchIssueListProgress = createAction("fetchIssueListProgress");

export {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
  fetchIssueListSuccess,
  fetchIssueListFailure,
  fetchIssueListProgress,
};
