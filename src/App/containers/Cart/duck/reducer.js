import { createReducer } from "@reduxjs/toolkit";
import {
  validateOrderSuccess,
  validateOrderFailed,
  validateOrderProgress,
  fetchCartSummarySuccess,
  fetchCartSummaryFailed,
  fetchCartSummaryProgress,
  fetchUpdateCartSuccess,
  fetchUpdateCartFailed,
  fetchUpdateCartProgress,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialValue = {
  cartSummary: null,
  validateInfo: null,
  fetchCartSummaryProgress: false,
  fetchCartSummaryFailed: false,
  fetchCartSummarySuccess: false,
  fetchUpdateCartSuccess: false,
  fetchUpdateCartFailed: false,
  fetchUpdateCartProgress: false,
  validateOrderSuccess: false,
  validateOrderFailed: false,
  validateOrderProgress: false,
  fetchCancelCartSuccess: false,
  fetchCancelCartFailed: false,
  fetchCancelCartProgress: false,
  errorMsg: "Something went wrong, please try again",
  successMsg: "",
  msg: "",
};

const cartReducer = createReducer(initialValue, {
  [fetchCartSummarySuccess]: (state, data) => ({
    ...state,
    fetchCartSummaryProgress: false,
    fetchCartSummaryFailed: false,
    fetchCartSummarySuccess: true,
    errorMsg: "",
    cartSummary: data.payload,
  }),
  [fetchCartSummaryFailed]: (state, error) => {
    return {
      ...state,
      fetchCartSummaryProgress: false,
      fetchCartSummaryFailed: true,
      fetchCartSummarySuccess: false,
      errorMsg: setErrorMessage(error),
    };
  },
  [fetchCartSummaryProgress]: (state) => ({
    ...state,
    fetchCartSummaryProgress: true,
    fetchCartSummaryFailed: false,
    fetchCartSummarySuccess: false,
  }),
  [fetchUpdateCartSuccess]: (state) => ({
    ...state,
    fetchUpdateCartProgress: false,
    fetchUpdateCartFailed: false,
    fetchUpdateCartSuccess: true,
    msg: "Order modification request raised.",
  }),
  [fetchUpdateCartFailed]: (state, data) => ({
    ...state,
    fetchUpdateCartProgress: false,
    fetchUpdateCartFailed: true,
    fetchUpdateCartSuccess: false,
    msg: data.message,
  }),
  [fetchUpdateCartProgress]: (state) => ({
    ...state,
    fetchUpdateCartProgress: true,
    fetchUpdateCartFailed: false,
    fetchUpdateCartSuccess: false,
  }),
  [validateOrderSuccess]: (state, data) => ({
    ...state,
    validateOrderProgress: false,
    validateOrderFailed: false,
    validateOrderSuccess: true,
    errorMsg: "",
    validateInfo: data.payload,
  }),
  [validateOrderFailed]: (state, error) => ({
    ...state,
    validateOrderProgress: false,
    validateOrderFailed: true,
    validateOrderSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [validateOrderProgress]: (state) => ({
    ...state,
    validateOrderProgress: true,
    validateOrderFailed: false,
    validateOrderSuccess: false,
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});

export { cartReducer };
