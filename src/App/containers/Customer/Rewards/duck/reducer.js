import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRewardSuccess,
  fetchRewardFailure,
  fetchRewardProgress,
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
    console.log("rewards-success", data);
    return {
      ...state,
      rewardsProgress: false,
      rewardsFail: false,
      rewardsSuccess: true,
      errorMsg: "",
      rewardsList: data.payload,
    };
  },
  [fetchRewardFailure]: (state) => ({
    ...state,
    rewardsProgress: false,
    rewardsFail: true,
    rewardsSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchRewardProgress]: (state) => {
    console.log("rewards-progress");
    return {
      ...state,
      rewardsProgress: true,
    };
  },
});

export { rewardsReducer };
