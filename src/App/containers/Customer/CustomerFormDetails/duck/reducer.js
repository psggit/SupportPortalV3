import { createReducer } from "@reduxjs/toolkit";
import {
  consumerUpdateSuccess,
  consumerUpdateFailed,
  consumerUpdateProgress,
} from "./actions";

const initialState = {
  updateConsumerData: null,
  updateProgress: false,
  updateFail: false,
  updateSuccess: false,
  errorMsg: "",
};

const customerUpdate = createReducer(initialState, {
  [consumerUpdateSuccess]: (state, data) => {
    console.log("SOAsuccess", data);
    return {
      ...state,
      updateProgress: false,
      updateFail: false,
      updateSuccess: true,
      errorMsg: "",
      updateConsumerData: data.payload,
    };
  },
  [consumerUpdateFailed]: (state) => ({
    ...state,
    updateProgress: false,
    updateFail: true,
    updateSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [consumerUpdateProgress]: (state) => {
    console.log("soa-progress");
    return {
      ...state,
      updateProgress: true,
    };
  },
});

export { customerUpdate };
