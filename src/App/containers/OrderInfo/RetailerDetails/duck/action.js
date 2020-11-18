import { createAction } from "@reduxjs/toolkit";

const fetchRetailerNotesSuccess = createAction("fetchRetailerNotesSuccess");
const fetchRetailerNotesFailed = createAction("fetchRetailerNotesFailed");
const fetchRetailerNotesProgress = createAction("fetchRetailerNotesProgress");
const fetchRetailerIssueListSuccess = createAction(
  "fetchRetailerIssueListSuccess"
);
const fetchRetailerIssueListFailure = createAction(
  "fetchRetailerIssueListFailure"
);
const fetchRetailerIssueListProgress = createAction(
  "fetchRetailerIssueListProgress"
);

export {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
  fetchRetailerIssueListSuccess,
  fetchRetailerIssueListFailure,
  fetchRetailerIssueListProgress,
};
