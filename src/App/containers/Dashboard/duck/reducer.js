import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  selectOrder,
  preponeOrderSuccess,
  preponeOrderFailed,
  preponeOrderProgress,
  fetchDeliverySuccess,
  fetchDeliveryFailed,
  fetchDeliveryProgress,
} from "./actions";

const initialValue = {
  orderData: null,
  orderId: null,
  payloadInfo: null,
  fetchDetailsProgress: false,
  fetchDetailsFail: false,
  fetchDetailsSuccess: false,
  preponeOrderProgress: false,
  preponeOrderFailed: false,
  preponeOrderSuccess: false,
  fetchDeliverySuccess: false,
  fetchDeliveryFailed: false,
  fetchDeliveryProgress: false,
  errorMsg: "",
  successMsg: "",
  deliveryStatus: [],
};

const dashboardReducer = createReducer(initialValue, {
  [fetchOrderSuccess]: (state, data) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsSuccess: true,
    errorMsg: "",
    orderData: data.payload,
  }),
  [fetchOrderFailed]: (state) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: true,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchOrderProgress]: (state, data) => ({
    ...state,
    payloadInfo: data,
    fetchDetailsProgress: true,
    fetchDetailsSuccess: false,
    fetchDetailsFail: false,
  }),
  [selectOrder]: (state, payload) => {
    return {
      ...state,
      orderId: payload.payload,
    };
  },
  [preponeOrderSuccess]: (state, data) => ({
    ...state,
    preponeOrderProgress: false,
    preponeOrderSuccess: true,
    errorMsg: "",
    successMsg: data.payload,
  }),
  [preponeOrderFailed]: (state) => ({
    ...state,
    preponeOrderProgress: false,
    preponeOrderFailed: true,
    errorMsg: "Something went wrong, please try again",
  }),
  [preponeOrderProgress]: (state) => ({
    ...state,
    preponeOrderProgress: true,
    preponeOrderSuccess: false,
    preponeOrderFailed: false,
  }),
  [fetchDeliverySuccess]: (state, data) => ({
    ...state,
    fetchDeliveryProgress: false,
    fetchDeliverySuccess: true,
    fetchDeliveryFailed: false,
    errorMsg: "",
    deliveryStatus: data.payload.message,
  }),
  [fetchDeliveryFailed]: (state, data) => ({
    ...state,
    fetchDeliveryProgress: false,
    fetchDeliveryFailed: true,
    fetchDeliverySuccess: false,
    errorMsg: data.payload.message,
  }),
  [fetchDeliveryProgress]: (state) => ({
    ...state,
    fetchDeliveryProgress: true,
    fetchDeliverySuccess: false,
    fetchDeliveryFailed: false,
  }),
});

export { dashboardReducer };
