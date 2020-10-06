/* eslint-disable prettier/prettier */
import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccess = createAction("fetchNotesSuccess");
const fetchNotesFailed = createAction("fetchNotesFailed");
const fetchNotesProgress = createAction("fetchNotesProgress");
//const selectOrder = createAction("selectOrder");

export { fetchNotesSuccess, fetchNotesFailed, fetchNotesProgress };