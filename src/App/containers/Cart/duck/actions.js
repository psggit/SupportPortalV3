import { createAction } from "@reduxjs/toolkit";

const validateOrderSuccess = createAction("validateOrderSuccess");
const validateOrderFailed = createAction("validateOrderFailed");
const validateOrderProgress = createAction("validateOrderProgress");

const fetchCartSummarySuccess = createAction("fetchCartSummarySuccess");
const fetchCartSummaryFailed = createAction("fetchCartSummaryFailed");
const fetchCartSummaryProgress = createAction("fetchCartSummaryProgress");

const fetchUpdateCartSuccess = createAction("fetchUpdateCartSuccess");
const fetchUpdateCartFailed = createAction("fetchUpdateCartFailed");
const fetchUpdateCartProgress = createAction("fetchUpdateCartProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  validateOrderSuccess,
  validateOrderFailed,
  validateOrderProgress,
  fetchCartSummarySuccess,
  fetchCartSummaryFailed,
  fetchCartSummaryProgress,
  fetchUpdateCartSuccess,
  fetchUpdateCartFailed,
  fetchUpdateCartProgress,
  resetOnUnmount,
};
