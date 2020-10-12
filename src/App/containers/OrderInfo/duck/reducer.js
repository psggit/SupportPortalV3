import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
} from "./actions";

const initialValue = {
  fetchOrderInfoProgress: true,
  fetchOrderInfoFailure: false,
  fetchOrderInfoSuccess: false,
  fetchCancelReasonProgress: false,
  fetchCancelReasonFailure: false,
  fetchCancelReasonSuccess: false,
  errorMsg: "",
  orderDetails: null,
  retailerDetails: null,
  cancelReasons: null,
};

const orderInfoReducer = createReducer(initialValue, {
  [fetchOrderInfoFailure]: (state) => {
    return {
      ...state,
      fetchOrderInfoProgress: false,
      fetchOrderInfoFailure: true,
      fetchOrderInfoSuccess: false,
      errorMsg: "Something went wrong, please try again",
    };
  },
  [fetchOrderInfoProgress]: (state) => {
    console.log("in progress");
    return {
      ...state,
      fetchOrderInfoProgress: true,
      fetchOrderInfoFailure: false,
      fetchOrderInfoSuccess: false,
    };
  },
  [fetchOrderInfoSuccess]: (state, data) => {
    console.log("in success", data);
    return {
      ...state,
      orderInfo: data.payload.order_details,
      orderDetails: data.payload.order_details,
      retailerDetails: data.payload,
      fetchOrderInfoProgress: false,
      fetchOrderInfoFailure: false,
      fetchOrderInfoSuccess: true,
      errorMsg: "",
    };
  },
  [fetchCancelReasonProgress]: (state) => ({
    ...state,
    fetchCancelReasonProgress: true,
    fetchCancelReasonFailure: false,
    fetchCancelReasonSuccess: false,
  }),
  [fetchCancelReasonFailure]: (state, err) => ({
    ...state,
    fetchCancelReasonProgress: false,
    fetchCancelReasonFailure: true,
    fetchCancelReasonSuccess: false,
    errorMsg: err,
  }),
  [fetchCancelReasonSuccess]: (state, data) => {
    return {
      ...state,
      fetchCancelReasonProgress: false,
      fetchCancelReasonFailure: false,
      fetchCancelReasonSuccess: true,
      errorMsg: "",
      cancelReasons: data.payload,
    };
  },
});

export { orderInfoReducer };