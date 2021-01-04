import { createAction } from "@reduxjs/toolkit";

const fetchHipcoinSoaSuccess = createAction("fetchHipcoinSoaSuccess");
const fetchHipcoinSoaFailure = createAction("fetchHipcoinSoaFailure");
const fetchHipcoinSoaProgress = createAction("fetchHipcoinSoaProgress");
const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchHipcoinSoaSuccess,
  fetchHipcoinSoaFailure,
  fetchHipcoinSoaProgress,
  resetOnUnmount,
};
