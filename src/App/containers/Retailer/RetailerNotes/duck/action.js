import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccessfull = createAction("fetchNotesSuccessfull");
const fetchNotesFailure = createAction("fetchNotesFailure");
const fetchNotesInProgress = createAction("fetchNotesInProgress");
const fetchRetailerNotesListSuccess = createAction(
  "fetchRetailerNotesListSuccess"
);
const fetchRetailerNotesListFailure = createAction(
  "fetchRetailerNotesListFailure"
);
const fetchRetailerNotesListProgress = createAction(
  "fetchRetailerNotesListProgress"
);

export {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
  fetchRetailerNotesListSuccess,
  fetchRetailerNotesListFailure,
  fetchRetailerNotesListProgress,
};
