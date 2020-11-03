import { createAction } from "@reduxjs/toolkit";

const fetchRewardSuccess = createAction("fetchRewardSuccess");
const fetchRewardFailure = createAction("fetchRewardFailure");
const fetchRewardProgress = createAction("fetchRewardProgress");
const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchRewardSuccess,
  fetchRewardFailure,
  fetchRewardProgress,
  resetOnUnmount,
};
