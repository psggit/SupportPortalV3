import { createReducer } from "@reduxjs/toolkit";
import { loginProgress, loginFailed, loginSuccess } from "./actions";

const initialValue = {
  isAuthenticated: false,
  loginProgressStatus: false,
  loginFailedStatus: false,
  loginSuccessStatus: false,
};

const loginReducer = createReducer(initialValue, {
  [loginSuccess]: (state) => ({
    ...state,
    isAuthenticated: true,
    loginProgressStatus: false,
    loginFailedStatus: false,
    loginSuccessStatus: true,
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
