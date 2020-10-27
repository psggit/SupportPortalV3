import { createAction } from "@reduxjs/toolkit";

const fetchCartSummarySuccess = createAction("fetchCartSummarySuccess");
const fetchCartSummaryFailed = createAction("fetchCartSummaryFailed");
const fetchCartSummaryProgress = createAction("fetchCartSummaryProgress");

const fetchUpdateCartSuccess = createAction("fetchUpdateCartSuccess");
const fetchUpdateCartFailed = createAction("fetchUpdateCartFailed");
const fetchUpdateCartProgress = createAction("fetchUpdateCartProgress");

export {
  fetchCartSummarySuccess,
  fetchCartSummaryFailed,
  fetchCartSummaryProgress,
  fetchUpdateCartSuccess,
  fetchUpdateCartFailed,
  fetchUpdateCartProgress,
};
