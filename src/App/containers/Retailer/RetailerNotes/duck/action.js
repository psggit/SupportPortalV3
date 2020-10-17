import { createAction } from "@reduxjs/toolkit";

const fetchNotesSuccessfull = createAction("fetchNotesSuccessfull");
const fetchNotesFailure = createAction("fetchNotesFailure");
const fetchNotesInProgress = createAction("fetchNotesInProgress");

export { fetchNotesSuccessfull, fetchNotesFailure, fetchNotesInProgress };
