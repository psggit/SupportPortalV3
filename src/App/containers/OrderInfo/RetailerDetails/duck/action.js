import { createAction } from "@reduxjs/toolkit";

const fetchRetailerNotesSuccess = createAction("fetchRetailerNotesSuccess");
const fetchRetailerNotesFailed = createAction("fetchRetailerNotesFailed");
const fetchRetailerNotesProgress = createAction("fetchRetailerNotesProgress");

export {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
};
