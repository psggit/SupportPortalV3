import { createAction } from "@reduxjs/toolkit";

const fetchOrderSuccess = createAction("fetchOrderSuccess");
const fetchOrderFailed = createAction("fetchOrderFailed");
const fetchOrderProgress = createAction("fetchOrderProgress");

const fetchActivityLogsProgress = createAction("fetchActivityLogsProgress");
const fetchActivityLogsFailed = createAction("fetchActivityLogsFailed");
const fetchActivityLogsSuccess = createAction("fetchActivityLogsSuccess");

export {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  fetchActivityLogsProgress,
  fetchActivityLogsFailed,
  fetchActivityLogsSuccess,
};
