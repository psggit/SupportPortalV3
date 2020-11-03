import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccess = createAction("fetchNotesSuccess");
const fetchNotesFailed = createAction("fetchNotesFailed");
const fetchNotesProgress = createAction("fetchNotesProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
  resetOnUnmount,
};
