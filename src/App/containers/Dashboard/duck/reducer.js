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
  fetchDetailsSuccess: false,
  errorMsg: "",
};

const homeReducer = createReducer(initialValue, {
  [fetchOrderSuccess]: (state, data) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: false,
    fetchDetailsSuccess: true,
    errorMsg: "",
    orderData: data.payload,
  }),
  [fetchOrderFailed]: (state) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: true,
    fetchDetailsSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchOrderProgress]: (state) => ({
    ...state,
    fetchDetailsProgress: true,
  }),
  [selectOrder]: (state, payload) => {
    console.log("[dashboard reducer]", payload.payload)
    return {
      ...state,
      orderId: payload.payload,
    };
  },
});

export { homeReducer };
