import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccess = createAction("fetchNotesSuccess");
const fetchNotesFailed = createAction("fetchNotesFailed");
const fetchNotesProgress = createAction("fetchNotesProgress");

export { fetchNotesSuccess, fetchNotesFailed, fetchNotesProgress };