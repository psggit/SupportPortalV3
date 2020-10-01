import { createAction } from "@reduxjs/toolkit";

const fetchOrderInfoProgress = createAction("fetchOrderInfoProgress");
const fetchOrderInfoFailure = createAction("fetchOrderInfoFailure");
const fetchOrderInfoSuccess = createAction("fetchOrderInfoSuccess");

export { fetchOrderInfoProgress, fetchOrderInfoFailure, fetchOrderInfoSuccess };
