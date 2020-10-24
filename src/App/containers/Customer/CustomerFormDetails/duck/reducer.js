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
  updateSuccessMsg: "",
};

const customerUpdateReducer = createReducer(initialState, {
  [consumerUpdateSuccess]: (state, data) => {
    console.log("form-success");
    return {
      ...state,
      updateProgress: false,
      updateFail: false,
      updateSuccess: true,
      errorMsg: "",
      updateConsumerData: data.payload,
      updateSuccessMsg: data.payload.message,
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
    console.log("form-progress");
    return {
      ...state,
      updateProgress: true,
    };
  },
});

export { customerUpdateReducer };
