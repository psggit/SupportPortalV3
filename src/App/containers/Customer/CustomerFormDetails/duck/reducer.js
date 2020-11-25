import { createReducer } from "@reduxjs/toolkit";
import {
  consumerUpdateSuccess,
  consumerUpdateFailed,
  consumerUpdateProgress,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

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
  [consumerUpdateFailed]: (state, error) => ({
    ...state,
    updateProgress: false,
    updateFail: true,
    updateSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [consumerUpdateProgress]: (state) => {
    return {
      ...state,
      updateProgress: true,
    };
  },
  [resetOnUnmount]: () => ({
    ...initialState,
  }),
});

export { customerUpdateReducer };
