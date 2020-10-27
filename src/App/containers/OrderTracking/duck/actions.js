import { createAction } from "@reduxjs/toolkit";

const fetchLiveDataProgress = createAction("fetchLiveDataProgress");
const fetchLiveDataSuccess = createAction("fetchLiveDataSuccess");
const fetchLiveDataFailure = createAction("fetchLiveDataFailure");

export { fetchLiveDataProgress, fetchLiveDataSuccess, fetchLiveDataFailure };
