import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRewardSuccess,
  fetchRewardFailure,
  fetchRewardProgress,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

const initialState = {
  rewardsList: null,
  rewardsProgress: false,
  rewardsFail: false,
  rewardsSuccess: false,
  errorMsg: "",
};

const rewardsReducer = createReducer(initialState, {
  [fetchRewardSuccess]: (state, data) => {
    return {
      ...state,
      rewardsProgress: false,
      rewardsFail: false,
      rewardsSuccess: true,
      errorMsg: "",
      rewardsList: data.payload,
    };
  },
  [fetchRewardFailure]: (state, data) => ({
    ...state,
    rewardsProgress: false,
    rewardsFail: true,
    rewardsSuccess: false,
    errorMsg: setErrorMessage(data),
  }),
  [fetchRewardProgress]: (state) => {
    return {
      ...state,
      rewardsProgress: true,
      rewardsSuccess: false,
    };
  },
  [resetOnUnmount]: () => {
    return {
      ...initialState,
    };
  },
});

export { rewardsReducer };
