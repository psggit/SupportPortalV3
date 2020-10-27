import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCartSummarySuccess,
  fetchCartSummaryFailed,
  fetchCartSummaryProgress,
  fetchUpdateCartSuccess,
  fetchUpdateCartFailed,
  fetchUpdateCartProgress,
} from "./actions";

const initialValue = {
  cartSummary: null,
  fetchCartSummaryProgress: false,
  fetchCartSummaryFailed: false,
  fetchCartSummarySuccess: false,
  fetchUpdateCartSuccess: false,
  fetchUpdateCartFailed: false,
  fetchUpdateCartProgress: false,
  errorMsg: "",
  successMsg: "",
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
  [fetchCartSummaryFailed]: (state) => ({
    ...state,
    fetchCartSummaryProgress: false,
    fetchCartSummaryFailed: true,
    fetchCartSummarySuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
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
    errorMsg: "",
  }),
  [fetchUpdateCartFailed]: (state) => ({
    ...state,
    fetchUpdateCartProgress: false,
    fetchUpdateCartFailed: true,
    fetchUpdateCartSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchUpdateCartProgress]: (state) => ({
    ...state,
    fetchUpdateCartProgress: true,
    fetchUpdateCartFailed: false,
    fetchUpdateCartSuccess: false,
  }),
});

export { cartReducer };
