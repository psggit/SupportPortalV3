import { createAction } from "@reduxjs/toolkit";

const fetchRewardSuccess = createAction("fetchRewardSuccess");
const fetchRewardFailure = createAction("fetchRewardFailure");
const fetchRewardProgress = createAction("fetchRewardProgress");

export { fetchRewardSuccess, fetchRewardFailure, fetchRewardProgress };
