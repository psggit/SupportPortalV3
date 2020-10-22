import { createAction } from "@reduxjs/toolkit";

const fetchOrderSuccess = createAction("fetchOrderSuccess");
const fetchOrderFailed = createAction("fetchOrderFailed");
const fetchOrderProgress = createAction("fetchOrderProgress");

const listRetailerSuccess = createAction("listRetailerSuccess");
const listRetailerFailed = createAction("listRetailerFailed");
const listRetailerProgress = createAction("listRetailerProgress");

export {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
};
