import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  fetchActivityLogsProgress,
  fetchActivityLogsFailed,
  fetchActivityLogsSuccess,
} from "./actions";

const initialValue = {
  orderData: null,
  activityLog: null,
  fetchDetailsProgress: false,
  fetchDetailsFail: false,
  fetchDetailsStatus: false,
  fetchActivityLogsProgress: false,
  fetchActivityLogsFailed: false,
  fetchActivityLogsSuccess: false,
  errorMsg: "",
};

const cartReducer = createReducer(initialValue, {
  [fetchOrderSuccess]: (state, payload) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: false,
    fetchDetailsStatus: true,
    errorMsg: "",
    orderData: payload.data,
  }),
  [fetchOrderFailed]: (state) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: true,
    fetchDetailsStatus: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchOrderProgress]: (state) => ({
    ...state,
    fetchDetailsProgress: true,
  }),
  [fetchActivityLogsProgress]: (state) => ({
    ...state,
    fetchActivityLogsProgress: true,
    fetchActivityLogsFailed: false,
    fetchActivityLogsSuccess: false,
    errorMsg: "",
  }),
  [fetchActivityLogsFailed]: (state) => ({
    ...state,
    fetchActivityLogsProgress: false,
    fetchActivityLogsFailed: true,
    fetchActivityLogsSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchActivityLogsSuccess]: (state, payload) => ({
    ...state,
    activityLog: payload.data,
    fetchActivityLogsProgress: false,
    fetchActivityLogsFailed: false,
    fetchActivityLogsSuccess: true,
    errorMsg: "",
  }),
});

export { cartReducer };
