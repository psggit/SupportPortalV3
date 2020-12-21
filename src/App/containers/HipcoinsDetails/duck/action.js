import { createAction } from "@reduxjs/toolkit";

const triggerEmailSuccess = createAction("triggerEmailSuccess");
const triggerEmailFailed = createAction("triggerEmailFailed");
const triggerEmailInProgress = createAction("triggerEmailInProgress");
const resetOnUnmount = createAction("resetOnUnmount");

export {
  triggerEmailSuccess,
  triggerEmailFailed,
  triggerEmailInProgress,
  resetOnUnmount,
};
