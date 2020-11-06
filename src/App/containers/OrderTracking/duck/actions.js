import { createAction } from "@reduxjs/toolkit";

const fetchLiveDataProgress = createAction("fetchLiveDataProgress");
const fetchLiveDataSuccess = createAction("fetchLiveDataSuccess");
const fetchLiveDataFailure = createAction("fetchLiveDataFailure");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchLiveDataProgress,
  fetchLiveDataSuccess,
  fetchLiveDataFailure,
  resetOnUnmount,
};
