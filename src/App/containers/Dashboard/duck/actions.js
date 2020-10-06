import { createAction } from "@reduxjs/toolkit";

const fetchOrderSuccess = createAction("fetchOrderSuccess");
const fetchOrderFailed = createAction("fetchOrderFailed");
const fetchOrderProgress = createAction("fetchOrderProgress");
const selectOrder = createAction("selectOrder");

export { fetchOrderSuccess, fetchOrderFailed, fetchOrderProgress, selectOrder };
