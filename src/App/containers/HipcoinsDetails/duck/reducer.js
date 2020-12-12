import { createReducer } from "@reduxjs/toolkit";
import {
  triggerEmailInProgress,
  triggerEmailSuccess,
  triggerEmailFailed,
} from "./action";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialState = {
  triggerEmailSuccess: false,
  triggerEmailFailed: false,
  triggerEmailInProgress: false,
  errorMsg: "",
  successMsg: "",
};

const hipcoinsDetailsReducer = createReducer(initialState, {
  [triggerEmailInProgress]: (state) => ({
    ...state,
    triggerEmailInProgress: true,
    triggerEmailFailed: false,
    triggerEmailSuccess: false,
  }),
  [triggerEmailFailed]: (state, error) => ({
    ...state,
    triggerEmailInProgress: false,
    triggerEmailFailed: true,
    triggerEmailSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [triggerEmailSuccess]: (state, data) => {
    return {
      ...state,
      triggerEmailInProgress: false,
      triggerEmailFailed: false,
      triggerEmailSuccess: true,
      successMsg: data.payload.message,
    };
  },
});

export { hipcoinsDetailsReducer };
