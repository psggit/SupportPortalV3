import { createAction } from "@reduxjs/toolkit";

const fetchOrderSuccess = createAction("fetchOrderSuccess");
const fetchOrderFailed = createAction("fetchOrderFailed");
const fetchOrderProgress = createAction("fetchOrderProgress");

export { fetchOrderSuccess, fetchOrderFailed, fetchOrderProgress };
