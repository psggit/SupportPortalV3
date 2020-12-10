import { createAction } from "@reduxjs/toolkit";

const fetchLoyalityPointsSuccess = createAction("fetchLoyalityPointsSuccess");
const fetchLoyalityPointsFailed = createAction("fetchLoyalityPointsFailed");
const fetchLoyalityPointsInProgress = createAction("fetchLoyalityPointsInProgress");
const resetDefaultState = createAction("resetDefaultState");

export {
  fetchLoyalityPointsSuccess,
  fetchLoyalityPointsFailed,
  fetchLoyalityPointsInProgress,
  resetDefaultState,
};
