import { createAction } from "@reduxjs/toolkit";

const fetchRetailerSuccess = createAction("fetchRetailerSuccess");
const fetchRetailerFailed = createAction("fetchRetailerFailed");
const fetchRetailerNotesSuccess = createAction("fetchRetailerNotesSuccess")
const fetchRetailerNotesFailed = createAction("fetchRetailerNotesFailed")

export { fetchRetailerSuccess, fetchRetailerFailed, fetchRetailerNotesSuccess, fetchRetailerNotesFailed };
