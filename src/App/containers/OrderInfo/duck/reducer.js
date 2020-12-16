import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
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
import { setErrorMessage } from "../../../utils/errorMessages";

const initialValue = {
  fetchOrderInfoProgress: false,
  fetchOrderInfoFailure: false,
  fetchOrderInfoSuccess: false,
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
  [fetchOrderInfoFailure]: (state, error) => {
    return {
      ...state,
      fetchOrderInfoProgress: false,
      fetchOrderInfoFailure: true,
      fetchOrderInfoSuccess: false,
      errorMsg: setErrorMessage(error),
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
    errorMsg: setErrorMessage(err),
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
  [connectCallFailed]: (state, error) => ({
    ...state,
    connectCallProgress: false,
    connectCallFailed: true,
    connectCallSuccess: false,
    errorMsg: setErrorMessage(error),
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
  [fetchIssueTypesFailed]: (state, data) => {
    return {
      ...state,
      fetchIssueTypesProgress: false,
      fetchIssueTypesFailed: true,
      fetchIssueTypesSuccess: false,
      errorMsgIssueTypes: setErrorMessage(data),
    };
  },
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
  [submitIssueFailed]: (state, data) => ({
    ...state,
    submitIssueProgress: false,
    submitIssueFailed: true,
    submitIssueSuccess: false,
    errorMsg: setErrorMessage(data),
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
    ...initialValue,
  }),
});

export { orderInfoReducer };
