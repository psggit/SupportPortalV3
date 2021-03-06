import { createAction } from "@reduxjs/toolkit";

const loginSuccess = createAction("loginSuccess");
const loginFailed = createAction("loginFailed");
const loginProgress = createAction("loginProgress");

const authorizationProgress = createAction("authorizationProgress");
const authorizationFailed = createAction("authorizationFailed");
const authorizationSuccess = createAction("authorizationSuccess");

const markActivityProgress = createAction("markActivityProgress");
const markActivityFailed = createAction("markActivityFailed");
const markActivitySuccess = createAction("markActivitySuccess");

export {
  loginSuccess,
  loginFailed,
  loginProgress,
  authorizationProgress,
  authorizationFailed,
  authorizationSuccess,
  markActivityProgress,
  markActivityFailed,
  markActivitySuccess,
};
