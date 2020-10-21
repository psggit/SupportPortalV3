import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
} from "./actions";

const initialValue = {
  orderData: null,
  fetchDetailsProgress: false,
  fetchDetailsFail: false,
  fetchDetailsStatus: false,
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
});

export { cartReducer };
