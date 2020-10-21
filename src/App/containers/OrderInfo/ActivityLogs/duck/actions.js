import { createAction } from "@reduxjs/toolkit";

const fetchLogProgress = createAction("fetchLogProgress");
const fetchLogFailed = createAction("fetchLogFailed");
const fetchLogSuccess = createAction("fetchLogSuccess");

export { fetchLogProgress, fetchLogFailed, fetchLogSuccess };
