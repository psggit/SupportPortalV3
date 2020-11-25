import { createReducer } from "@reduxjs/toolkit";
import {
  logoutSuccess,
  logoutFailed,
  logoutProgress,
  resetOnUnmount,
} from "./action";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialValue = {
  logoutSuccess,
  logoutFailed,
  logoutProgress,
  errorMsg: "",
};

const logoutReducer = createReducer(initialValue, {
  [logoutSuccess]: (state) => ({
    ...state,
    logoutProgress: false,
    logoutFailed: false,
    logoutSuccess: true,
    errorMsg: "",
  }),
  [logoutFailed]: (state, data) => {
    return {
      ...state,
      logoutProgress: false,
      logoutFailed: true,
      logoutSuccess: false,
      errorMsg: setErrorMessage(data),
    };
  },
  [logoutProgress]: (state) => ({
    ...state,
    logoutProgress: true,
    logoutFailed: false,
    logoutSuccess: false,
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});
export { logoutReducer };
