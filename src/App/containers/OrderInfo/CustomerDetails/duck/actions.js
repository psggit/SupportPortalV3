import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccess = createAction("fetchNotesSuccess");
const fetchNotesFailed = createAction("fetchNotesFailed");
const fetchNotesProgress = createAction("fetchNotesProgress");
const consumerNoteListSuccess = createAction("consumerNoteListSuccess");
const consumerNoteListFailed = createAction("consumerNoteListFailed");
const consumerNoteListProgress = createAction("consumerNoteListProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
  resetOnUnmount,
  consumerNoteListSuccess,
  consumerNoteListFailed,
  consumerNoteListProgress,
};
