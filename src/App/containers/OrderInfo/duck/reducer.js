import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  createNotesProgress,
  createNotesFailure,
  createNotesSuccess,
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
  fetchIssueTypesProgress,
  fetchIssueTypesFailed,
  fetchIssueTypesSuccess,
  submitIssueProgress,
  submitIssueFailed,
  submitIssueSuccess,
  resetOnUnmount,
} from "./actions";

const initialValue = {
  fetchOrderInfoProgress: false,
  fetchOrderInfoFailure: false,
  fetchOrderInfoSuccess: false,
  fetchCancelReasonProgress: false,
  fetchCancelReasonFailure: false,
  fetchCancelReasonSuccess: false,
  createNotesProgress: false,
  createNotesFailure: false,
  createNotesSuccess: false,
  connectCallProgress: false,
  connectCallFailed: false,
  connectCallSuccess: false,
  fetchIssueTypesProgress: false,
  fetchIssueTypesFailed: false,
  fetchIssueTypesSuccess: false,
  submitIssueProgress: false,
  submitIssueFailed: false,
  submitIssueSuccess: false,
  errorMsg: "",
  successMsg: "",
  orderDetails: null,
  retailerDetails: null,
  cancelReasons: null,
  customerId: null,
  customerContactNumber: null,
  activityLog: null,
  issueTypes: null,
};

const orderInfoReducer = createReducer(initialValue, {
  [fetchOrderInfoFailure]: (state) => {
    console.log("orderInfoReducer fetchOrderInfoFailure");
    return {
      ...state,
      fetchOrderInfoProgress: false,
      fetchOrderInfoFailure: true,
      fetchOrderInfoSuccess: false,
      errorMsg: "Something went wrong, please try again!",
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
      products: data.payload.order_details.cart_items,
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
    errorMsg: err.payload.message,
  }),
  [createNotesSuccess]: (state, data) => {
    return {
      ...state,
      createNotesProgress: false,
      createNotesFailure: false,
      createNotesSuccess: true,
      successMsg: data.payload.message,
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
  [fetchIssueTypesProgress]: (state) => ({
    ...state,
    fetchIssueTypesProgress: true,
    fetchIssueTypesFailed: false,
    fetchIssueTypesSuccess: false,
    errorMsg: "",
  }),
  [fetchIssueTypesFailed]: (state) => ({
    ...state,
    fetchIssueTypesProgress: false,
    fetchIssueTypesFailed: true,
    fetchIssueTypesSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchIssueTypesSuccess]: (state, data) => {
    return {
      ...state,
      issueTypes: data.payload,
      fetchIssueTypesProgress: false,
      fetchIssueTypesFailed: false,
      fetchIssueTypesSuccess: true,
      errorMsg: "",
    };
  },
  [submitIssueProgress]: (state) => ({
    ...state,
    submitIssueProgress: true,
    submitIssueFailed: false,
    submitIssueSuccess: false,
    errorMsg: "",
  }),
  [submitIssueFailed]: (state) => ({
    ...state,
    submitIssueProgress: false,
    submitIssueFailed: true,
    submitIssueSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [submitIssueSuccess]: (state, data) => {
    return {
      ...state,
      submitIssueProgress: false,
      submitIssueFailed: false,
      submitIssueSuccess: true,
      errorMsg: "",
      successMsg: data.payload.message,
    };
  },
  [resetOnUnmount]: () => ({
    fetchOrderInfoProgress: true,
    fetchOrderInfoFailure: false,
    fetchOrderInfoSuccess: false,
    fetchCancelReasonProgress: false,
    fetchCancelReasonFailure: false,
    fetchCancelReasonSuccess: false,
    createNotesProgress: false,
    createNotesFailure: false,
    createNotesSuccess: false,
    connectCallProgress: false,
    connectCallFailed: false,
    connectCallSuccess: false,
    fetchIssueTypesProgress: false,
    fetchIssueTypesFailed: false,
    fetchIssueTypesSuccess: false,
    submitIssueProgress: false,
    submitIssueFailed: false,
    submitIssueSuccess: false,
    errorMsg: "",
    successMsg: "",
  }),
});

export { orderInfoReducer };
