import { createAction } from "@reduxjs/toolkit";

const listRetailerSuccess = createAction("listRetailerSuccess");
const listRetailerFailed = createAction("listRetailerFailed");
const listRetailerProgress = createAction("listRetailerProgress");

const reassignRetailerSuccess = createAction("reassignRetailerSuccess");
const reassignRetailerFailed = createAction("reassignRetailerFailed");
const reassignRetailerProgress = createAction("reassignRetailerProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
  reassignRetailerProgress,
  reassignRetailerFailed,
  reassignRetailerSuccess,
  resetOnUnmount,
};
