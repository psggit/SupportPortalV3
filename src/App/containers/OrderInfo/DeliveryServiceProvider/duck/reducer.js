import { createReducer } from "@reduxjs/toolkit";
import {
  pushOrderSuccess,
  pushOrderFailed,
  pushOrderProgress,
  restockOrderSuccess,
  restockOrderFailed,
  restockOrderProgress,
  fetchOTPSuccess,
  fetchOTPFailed,
  fetchOTPProgress,
  cancelOrderDSPSuccess,
  cancelOrderDSPFailed,
  cancelOrderDSPProgress,
  resetOnUnmount,
} from "./action";

const initialValue = {
  pushOrderSuccess: false,
  pushOrderFailed: false,
  pushOrderProgress: false,
  restockOrderSuccess: false,
  restockOrderFailed: false,
  restockOrderProgress: false,
  fetchOTPSuccess: false,
  fetchOTPFailed: false,
  fetchOTPProgress: false,
  cancelOrderDSPSuccess: false,
  cancelOrderDSPFailed: false,
  cancelOrderDSPProgress: false,
  errorMsg: "",
  message: "",
};
const dspReducer = createReducer(initialValue, {
  [pushOrderSuccess]: (state, data) => {
    return {
      ...state,
      pushOrderSuccess: true,
      pushOrderFailed: false,
      pushOrderProgress: false,
      errorMsg: "",
      message: data.payload.message,
    };
  },
  [pushOrderFailed]: (state, error) => ({
    ...state,
    pushOrderSuccess: false,
    pushOrderFailed: true,
    pushOrderProgress: false,
    errorMsg: error.payload.message,
    message: "",
  }),
  [pushOrderProgress]: (state) => ({
    ...state,
    pushOrderSuccess: false,
    pushOrderFailed: false,
    pushOrderProgress: true,
    errorMsg: "",
    message: "",
  }),
  [restockOrderSuccess]: (state, data) => ({
    ...state,
    restockOrderSuccess: true,
    restockOrderFailed: false,
    restockOrderProgress: false,
    message: data.payload.message,
    errorMsg: "",
  }),
  [restockOrderFailed]: (state, data) => ({
    ...state,
    restockOrderSuccess: false,
    restockOrderFailed: true,
    restockOrderProgress: false,
    message: data.payload.message,
    errorMsg: "",
  }),
  [restockOrderProgress]: (state) => ({
    ...state,
    restockOrderSuccess: false,
    restockOrderFailed: false,
    restockOrderProgress: true,
    errorMsg: "",
    message: "",
  }),
  [fetchOTPSuccess]: (state, data) => ({
    ...state,
    fetchOTPSuccess: true,
    fetchOTPFailed: false,
    fetchOTPProgress: false,
    message: data.payload.message,
    errorMsg: "",
  }),
  [fetchOTPFailed]: (state, error) => ({
    ...state,
    fetchOTPSuccess: false,
    fetchOTPFailed: true,
    fetchOTPProgress: false,
    errorMsg: error.payload.message,
    message: "",
  }),
  [fetchOTPProgress]: (state) => ({
    ...state,
    fetchOTPSuccess: false,
    fetchOTPFailed: false,
    fetchOTPProgress: true,
    errorMsg: "",
    message: "",
  }),
  [cancelOrderDSPSuccess]: (state, data) => ({
    ...state,
    cancelOrderDSPSuccess: true,
    cancelOrderDSPFailed: false,
    cancelOrderDSPProgress: false,
    message: data.payload.message,
    errorMsg: "",
  }),
  [cancelOrderDSPFailed]: (state, error) => ({
    ...state,
    cancelOrderDSPSuccess: false,
    cancelOrderDSPFailed: true,
    cancelOrderDSPProgress: false,
    errorMsg: error.payload.message,
    message: "",
  }),
  [cancelOrderDSPProgress]: (state) => ({
    ...state,
    cancelOrderDSPSuccess: false,
    cancelOrderDSPFailed: false,
    cancelOrderDSPProgress: true,
    errorMsg: "",
    message: "",
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});
export { dspReducer };