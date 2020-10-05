import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
} from "./actions";

const initialValue = {
  fetchOrderInfoProgress: false,
  fetchOrderInfoFailure: false,
  fetchOrderInfoSuccess: false,
  errorMsg: "",
  orderInfo: null,
};

const orderInfoReducer = createReducer(initialValue, {
  [fetchOrderInfoProgress]: (state) => ({
    ...state,
    fetchOrderInfoProgress: true,
    fetchOrderInfoFailure: false,
    fetchOrderInfoSuccess: false,
  }),
  [fetchOrderInfoFailure]: (state) => ({
    ...state,
    fetchOrderInfoProgress: false,
    fetchOrderInfoFailure: true,
    fetchOrderInfoSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchOrderInfoSuccess]: (state, data) => {
    return {
      ...state,
      orderInfo: data.payload.order_details,
      fetchOrderInfoProgress: false,
      fetchOrderInfoFailure: false,
      fetchOrderInfoSuccess: true,
      errorMsg: "",
    };
  },
});

export { orderInfoReducer };
