import { createAction } from "@reduxjs/toolkit";

const fetchDANotesProgress = createAction("fetchDANotesInfoProgress");
const fetchDANotesFailure = createAction("fetchDANotesFailure");
const fetchDANotesSuccess = createAction("fetchDANotesInfoSuccess");

export { fetchDANotesProgress, fetchDANotesFailure, fetchDANotesSuccess };