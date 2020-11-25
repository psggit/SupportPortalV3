import { createReducer } from "@reduxjs/toolkit";
import {
  loginProgress,
  loginFailed,
  loginSuccess,
  authorizationFailed,
  authorizationSuccess,
  authorizationProgress,
} from "./actions";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialValue = {
  isAuthenticated: false,
  authenticateProgress: false,
  authenticateFailed: false,
  authenticateSuccess: false,
  loginProgressStatus: false,
  loginFailedStatus: false,
  loginSuccessStatus: null,
  errorMsg: "",
  successMsg: null,
  xHasuraRole: null,
  hasuraId: null,
  authData: null,
};

const loginReducer = createReducer(initialValue, {
  [loginSuccess]: (state, data) => ({
    ...state,
    isAuthenticated: true,
    loginSuccessStatus: true,
    loginProgressStatus: false,
    loginFailedStatus: false,
    successMsg: data.payload,
    errorMsg: "",
  }),
  [loginFailed]: (state, data) => ({
    ...state,
    isAuthenticated: false,
    loginProgressStatus: false,
    loginFailedStatus: true,
    errorMsg: setErrorMessage(data),
  }),
  [loginProgress]: (state) => ({
    ...state,
    isAuthenticated: false,
    loginProgressStatus: true,
    loginSuccessStatus: false,
  }),
  [authorizationFailed]: (state) => ({
    ...state,
    isAuthenticated: false,
    authenticateProgress: false,
    authenticateFailed: true,
    authenticateSuccess: false,
  }),
  [authorizationSuccess]: (state, data) => ({
    ...state,
    isAuthenticated: true,
    authenticateFailed: false,
    authenticateProgress: false,
    authenticateSuccess: true,
    authData: data.payload,
  }),
  [authorizationProgress]: (state) => ({
    ...state,
    isAuthenticated: false,
    authenticateProgress: true,
    authenticateFailed: false,
    authenticateSuccess: false,
  }),
});

export { loginReducer };
