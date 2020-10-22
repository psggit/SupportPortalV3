import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
} from "./action";

const initialValue = {
  orderData: null,
  listRetailerData: null,
  fetchDetailsProgress: false,
  fetchDetailsFail: false,
  fetchDetailsStatus: false,
  listRetailerSuccess: false,
  listRetailerFailed: false,
  listRetailerProgress: false,
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
  [listRetailerSuccess]: (state, payload) => ({
    ...state,
    listRetailerProgress: false,
    listRetailerFailed: false,
    listRetailerSuccess: true,
    errorMsg: "",
    listRetailerData: payload.data,
  }),
  [listRetailerFailed]: (state) => ({
    ...state,
    listRetailerProgress: false,
    listRetailerFailed: true,
    listRetailerSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [listRetailerProgress]: (state) => ({
    ...state,
    listRetailerProgress: true,
  }),
});

export { cartReducer };
