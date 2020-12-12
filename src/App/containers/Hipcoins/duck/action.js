import { createAction } from "@reduxjs/toolkit";

const fetchLoyalityPointsSuccess = createAction("fetchLoyalityPointsSuccess");
const fetchLoyalityPointsFailed = createAction("fetchLoyalityPointsFailed");
const fetchLoyalityPointsInProgress = createAction("fetchLoyalityPointsInProgress");

export {
  fetchLoyalityPointsSuccess,
  fetchLoyalityPointsFailed,
  fetchLoyalityPointsInProgress,
};
