import { createAction } from "@reduxjs/toolkit";

const pushOrderSuccess = createAction("pushOrderSuccess");
const pushOrderFailed = createAction("pushOrderFailed");
const pushOrderProgress = createAction("pushOrderProgress");

const restockOrderSuccess = createAction("restockOrderSuccess");
const restockOrderFailed = createAction("restockOrderFailed");
const restockOrderProgress = createAction("restockOrderProgress");

const fetchOTPSuccess = createAction("fetchOTPSuccess");
const fetchOTPFailed = createAction("fetchOTPFailed");
const fetchOTPProgress = createAction("fetchOTPProgress");

const cancelOrderDSPSuccess = createAction("cancelOrderDSPSuccess");
const cancelOrderDSPFailed = createAction("cancelOrderDSPFailed");
const cancelOrderDSPProgress = createAction("cancelOrderDSPProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  pushOrderSuccess,
  pushOrderFailed,
  pushOrderProgress,
  restockOrderSuccess,
  restockOrderFailed,
  restockOrderProgress,
  fetchOTPSuccess,
  fetchOTPFailed,
  fetchOTPProgress,
  cancelOrderDSPSuccess,
  cancelOrderDSPFailed,
  cancelOrderDSPProgress,
  resetOnUnmount,
};
