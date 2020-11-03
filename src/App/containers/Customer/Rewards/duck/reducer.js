import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRewardSuccess,
  fetchRewardFailure,
  fetchRewardProgress,
  resetOnUnmount,
} from "./actions";

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
    errorMsg: data.payload.message,
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
      rewardsProgress: false,
      rewardsFail: false,
      rewardsSuccess: false,
      errorMsg: "",
    };
  },
});

export { rewardsReducer };
