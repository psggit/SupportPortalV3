import { createAction } from "@reduxjs/toolkit";

const fetchCustomerNotesSuccess = createAction("fetchCustomerNotesSuccess");
const fetchCustomerNotesFailed = createAction("fetchCustomerNotesFailed");
const fetchCustomerNotesProgress = createAction("fetchCustomerNotesProgress");
const consumerNoteListSuccess = createAction("consumerNoteListSuccess");
const consumerNoteListFailed = createAction("consumerNoteListFailed");
const consumerNoteListProgress = createAction("consumerNoteListProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchCustomerNotesSuccess,
  fetchCustomerNotesFailed,
  fetchCustomerNotesProgress,
  resetOnUnmount,
  consumerNoteListSuccess,
  consumerNoteListFailed,
  consumerNoteListProgress,
};
