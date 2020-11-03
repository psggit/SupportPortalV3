import { createAction } from "@reduxjs/toolkit";

const fetchGiftSoaSuccess = createAction("fetchGiftSoaSuccess");
const fetchGiftSoaFailure = createAction("fetchGiftSoaFailure");
const fetchGiftSoaProgress = createAction("fetchGiftSoaProgress");
const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchGiftSoaSuccess,
  fetchGiftSoaFailure,
  fetchGiftSoaProgress,
  resetOnUnmount,
};
