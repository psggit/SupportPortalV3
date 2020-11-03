import { createAction } from "@reduxjs/toolkit";

const consumerUpdateSuccess = createAction("consumerUpdateSuccess");
const consumerUpdateFailed = createAction("consumerUpdateFailed");
const consumerUpdateProgress = createAction("consumerUpdateProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  consumerUpdateSuccess,
  consumerUpdateFailed,
  consumerUpdateProgress,
  resetOnUnmount,
};
