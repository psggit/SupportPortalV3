import { createReducer } from "@reduxjs/toolkit";
import {
  fetchLoyalityPointsSuccess,
  fetchLoyalityPointsFailed,
  fetchLoyalityPointsInProgress,
  resetDefaultState,
} from "./action";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialState = {
  fetchLoyalityPointsSuccess: false,
  fetchLoyalityPointsFailed: false,
  fetchLoyalityPointsInProgress: false,
  loyalityPoints: null,
  errorMsg: "",
};

const hipcoinsReducer = createReducer(initialState, {
  [fetchLoyalityPointsInProgress]: (state) => ({
    ...state,
    fetchLoyalityPointsInProgress: true,
    fetchLoyalityPointsFailed: false,
    fetchLoyalityPointsSuccess: false,
  }),
  [fetchLoyalityPointsFailed]: (state, error) => ({
    ...state,
    fetchLoyalityPointsInProgress: false,
    fetchLoyalityPointsFailed: true,
    fetchLoyalityPointsSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [fetchLoyalityPointsSuccess]: (state, data) => {
    console.log("success", data.payload)
    return {
      ...state,
      fetchLoyalityPointsInProgress: false,
      fetchLoyalityPointsFailed: false,
      fetchLoyalityPointsSuccess: true,
      loyalityPoints: data.payload,
    };
  },
  [resetDefaultState]: (state) => {
    console.log("reset")
    return {
      ...state,
      initialState
    }
  },
});

export { hipcoinsReducer };
