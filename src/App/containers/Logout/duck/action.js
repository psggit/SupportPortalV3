import { createAction } from "@reduxjs/toolkit";

const logoutSuccess = createAction("logoutSuccess");
const logoutFailed = createAction("logoutFailed");
const logoutProgress = createAction("logoutProgress");

export { logoutSuccess, logoutFailed, logoutProgress };
