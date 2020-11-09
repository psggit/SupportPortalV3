import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  selectOrder,
} from "./actions";

const initialValue = {
  orderData: null,
  fetchDetailsProgress: false,
  fetchDetailsFail: false,
  fetchDetailsSuccess: false,
  errorMsg: "",
};

const homeReducer = createReducer(initialValue, {
  [fetchOrderSuccess]: (state, data) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsSuccess: true,
    errorMsg: "",
    orderData: data.payload,
  }),
  [fetchOrderFailed]: (state, data) => ({
    ...state,
    fetchDetailsProgress: false,
    fetchDetailsFail: true,
    errorMsg: data.payload.message,
  }),
  [fetchOrderProgress]: (state, data) => ({
    ...state,
    payloadInfo: data.payload,
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
});

export { homeReducer };
