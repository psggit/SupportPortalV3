import { createAction } from "@reduxjs/toolkit";

const fetchActLogsSuccessfull = createAction("fetchActLogsSuccessfull");
const fetchActLogsFailure = createAction("fetchActLogsFailure");
const fetchActLogsInProgress = createAction("fetchActLogsInProgress");

export { fetchActLogsSuccessfull, fetchActLogsFailure, fetchActLogsInProgress };
