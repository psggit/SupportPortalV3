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
import { setErrorMessage } from "../../../utils/errorMessages";

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
  errorMessageDeliveryStatus: "",
  successMsg: "",
  deliveryStatus: [],
};

const dashboardReducer = createReducer(initialValue, {
  [fetchOrderSuccess]: (state, data) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsSuccess: true,
    fetchDetailsFail: false,
    errorMsg: "",
    orderData: data.payload,
  }),
  [fetchOrderFailed]: (state, data) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: true,
    fetchDetailsSuccess: false,
    errorMsg: setErrorMessage(data),
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
    preponeOrderFailed: false,
    errorMsg: "",
    successMsg: data.payload,
  }),
  [preponeOrderFailed]: (state, data) => ({
    ...state,
    preponeOrderProgress: false,
    preponeOrderFailed: true,
    errorMsg: setErrorMessage(data),
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
    errorMessageDeliveryStatus: setErrorMessage(data),
  }),
  [fetchDeliveryProgress]: (state) => ({
    ...state,
    fetchDeliveryProgress: true,
    fetchDeliverySuccess: false,
    fetchDeliveryFailed: false,
  }),
});

export { dashboardReducer };
