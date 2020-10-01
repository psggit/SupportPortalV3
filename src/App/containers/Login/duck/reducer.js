import { createReducer } from "@reduxjs/toolkit";
import { loginProgress, loginFailed, loginSuccess } from "./actions";

const initialValue = {
  isAuthenticated: false,
  loginProgressStatus: false,
  loginFailedStatus: false,
  loginSuccessStatus: false,
  errorMsg: "",
  successMsg: "",
  xHasuraRole: null,
  hasuraId: null,
};

const loginReducer = createReducer(initialValue, {
  [loginSuccess]: (state, payload) => ({
    ...state,
    isAuthenticated: true,
    loginProgressStatus: false,
    loginFailedStatus: false,
    loginSuccessStatus: true,
    successMsg: payload.message,
    errorMsg: "",
  }),
  [loginFailed]: (state) => ({
    ...state,
    isAuthenticated: false,
    loginProgressStatus: false,
    loginFailedStatus: true,
    loginSuccessStatus: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [loginProgress]: (state) => ({
    ...state,
    isAuthenticated: false,
    loginProgressStatus: true,
  }),
});

export { loginReducer };
