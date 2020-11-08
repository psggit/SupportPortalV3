import { createAction } from "@reduxjs/toolkit";

const logoutSuccess = createAction("logoutSuccess");
const logoutFailed = createAction("logoutFailed");
const logoutProgress = createAction("logoutProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export { logoutSuccess, logoutFailed, logoutProgress, resetOnUnmount };
