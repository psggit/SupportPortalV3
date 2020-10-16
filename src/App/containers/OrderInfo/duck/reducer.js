import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  fetchActivityLogsProgress,
  fetchActivityLogsFailed,
  fetchActivityLogsSuccess,
  createNotesProgress,
  createNotesFailure,
  createNotesSuccess,
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
} from "./actions";

const initialValue = {
  fetchOrderInfoProgress: true,
  fetchOrderInfoFailure: false,
  fetchOrderInfoSuccess: false,
  fetchCancelReasonProgress: false,
  fetchCancelReasonFailure: false,
  fetchCancelReasonSuccess: false,
  fetchActivityLogsProgress: false,
  fetchActivityLogsFailed: false,
  fetchActivityLogsSuccess: false,
  createNotesProgress: false,
  createNotesFailure: false,
  createNotesSuccess: false,
  connectCallProgress: false,
  connectCallFailed: false,
  connectCallSuccess: false,
  errorMsg: "",
  successMsg: "",
  orderDetails: null,
  retailerDetails: null,
  cancelReasons: null,
  customerId: null,
  customerContactNumber: null,
  activityLog: null,
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
    return {
      ...state,
      fetchOrderInfoProgress: true,
      fetchOrderInfoFailure: false,
      fetchOrderInfoSuccess: false,
    };
  },
  [fetchOrderInfoSuccess]: (state, data) => {
    return {
      ...state,
      orderInfo: data.payload.order_details,
      orderDetails: data.payload.order_details,
      customerId: data.payload.order_details.customer_id,
      customerContactNumber: data.payload.order_details.customer_contact_number,
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
  [fetchActivityLogsProgress]: (state) => ({
    ...state,
    fetchActivityLogsProgress: true,
    fetchActivityLogsFailed: false,
    fetchActivityLogsSuccess: false,
    errorMsg: "",
  }),
  [fetchActivityLogsFailed]: (state) => ({
    ...state,
    fetchActivityLogsProgress: false,
    fetchActivityLogsFailed: true,
    fetchActivityLogsSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchActivityLogsSuccess]: (state, payload) => ({
    ...state,
    activityLog: payload.data,
    fetchActivityLogsProgress: false,
    fetchActivityLogsFailed: false,
    fetchActivityLogsSuccess: true,
    errorMsg: "",
  }),
  [createNotesProgress]: (state) => ({
    ...state,
    createNotesProgress: true,
    createNotesFailure: false,
    createNotesSuccess: false,
  }),
  [createNotesFailure]: (state, err) => ({
    ...state,
    createNotesProgress: false,
    createNotesFailure: true,
    createNotesSuccess: false,
    errorMsg: err,
  }),
  [createNotesSuccess]: (state) => {
    return {
      ...state,
      createNotesProgress: false,
      createNotesFailure: false,
      createNotesSuccess: true,
      errorMsg: "",
    };
  },
  [connectCallProgress]: (state) => ({
    ...state,
    connectCallProgress: true,
    connectCallFailed: false,
    connectCallSuccess: false,
    errorMsg: "",
  }),
  [connectCallFailed]: (state) => ({
    ...state,
    connectCallProgress: false,
    connectCallFailed: true,
    connectCallSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [connectCallSuccess]: (state, payload) => ({
    ...state,
    successMsg: payload,
    connectCallProgress: false,
    connectCallFailed: false,
    connectCallSuccess: true,
    errorMsg: "",
  }),
});

export { orderInfoReducer };
