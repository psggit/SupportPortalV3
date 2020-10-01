import { createAction } from "@reduxjs/toolkit";

const loginSuccess = createAction("loginSuccess");
const loginFailed = createAction("loginFailed");
const loginProgress = createAction("loginProgress");

export { loginSuccess, loginFailed, loginProgress };
