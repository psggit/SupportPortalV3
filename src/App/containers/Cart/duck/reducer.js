import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  selectOrder,
} from "./actions";

const initialValue = {
  orderData: null,
  orderId: null,
  fetchDetailsProgress: false,
  fetchDetailsFail: false,
  fetchDetailsStatus: false,
  errorMsg: "",
};

const homeReducer = createReducer(initialValue, {
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
  [selectOrder]: (state, orderId) => ({
    ...state,
    orderId: orderId,
  }),
});

export { homeReducer };
