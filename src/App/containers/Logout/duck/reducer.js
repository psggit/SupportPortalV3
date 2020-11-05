import { createReducer } from "@reduxjs/toolkit";
import { logoutSuccess, logoutFailed, logoutProgress } from "./action";

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
      errorMsg: data.payload.message,
    };
  },
  [logoutProgress]: (state) => ({
    ...state,
    logoutProgress: true,
  }),
});
export { logoutReducer };
