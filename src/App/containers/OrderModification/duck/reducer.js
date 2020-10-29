import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderInProgress,
  sendSMSInProgress,
  sendSMSSuccess,
  sendSMSFailed,
  resolveOrderInProgress,
  resolveOrderSuccess,
  resolveOrderFailed,
  fetchSupportPersonListInProgress,
  fetchSupportPersonListSuccess,
  fetchSupportPersonListFailed,
  fetchCancelCartSuccess,
  fetchCancelCartFailed,
  fetchCancelCartProgress,
  fetchUpdatedStatusSuccess,
  fetchUpdatedStatusFailed,
  fetchUpdatedStatusProgress,
} from "./action";

const initialState = {
  fetchOrderSuccess: false,
  fetchOrderFailed: false,
  fetchOrderInProgress: false,
  sendSMSInProgress: false,
  sendSMSSuccess: false,
  sendSMSFailed: false,
  resolveOrderInProgress: false,
  resolveOrderSuccess: false,
  resolveOrderFailed: false,
  fetchSupportPersonListInProgress: false,
  fetchSupportPersonListSuccess: false,
  fetchSupportPersonListFailed: false,
  fetchCancelCartSuccess: false,
  fetchCancelCartFailed: false,
  fetchCancelCartProgress: false,
  fetchUpdatedStatusSuccess: false,
  fetchUpdatedStatusFailed: false,
  fetchUpdatedStatusProgress: false,
  orderList: null,
  supportPersonList: null,
  msg: "",
  errorMsg: "",
};

const orderModificationReducer = createReducer(initialState, {
  [fetchOrderInProgress]: (state) => ({
    ...state,
    fetchOrderInProgress: true,
    fetchOrderFailed: false,
    fetchOrderSuccess: false,
    sendSMSInProgress: false,
    sendSMSSuccess: false,
    sendSMSFailed: false,
  }),
  [fetchOrderFailed]: (state) => ({
    ...state,
    fetchOrderInProgress: false,
    fetchOrderFailed: true,
    fetchOrderSuccess: false,
  }),
  [fetchOrderSuccess]: (state, data) => {
    return {
      ...state,
      fetchOrderInProgress: false,
      fetchOrderFailed: false,
      fetchOrderSuccess: true,
      orderList: data.payload,
    };
  },
  [sendSMSInProgress]: (state) => {
    return {
      ...state,
      sendSMSInProgress: true,
      sendSMSFailed: false,
      sendSMSSuccess: false,
    };
  },
  [sendSMSSuccess]: (state, data) => {
    return {
      ...state,
      sendSMSInProgress: false,
      sendSMSFailed: false,
      sendSMSSuccess: true,
      msg: data.payload,
    };
  },
  [sendSMSFailed]: (state, data) => {
    return {
      ...state,
      sendSMSInProgress: false,
      sendSMSFailed: true,
      sendSMSSuccess: false,
      msg: data.payload,
    };
  },
  [resolveOrderInProgress]: (state) => {
    return {
      ...state,
      resolveOrderInProgress: true,
      resolveOrderFailed: false,
      resolveOrderSuccess: false,
    };
  },
  [resolveOrderSuccess]: (state) => {
    return {
      ...state,
      resolveOrderInProgress: false,
      resolveOrderFailed: false,
      resolveOrderSuccess: true,
    };
  },
  [resolveOrderFailed]: (state) => {
    return {
      ...state,
      resolveOrderInProgress: false,
      resolveOrderFailed: true,
      resolveOrderSuccess: false,
    };
  },
  [fetchSupportPersonListInProgress]: (state) => {
    return {
      ...state,
      fetchSupportPersonListInProgress: true,
      fetchSupportPersonListFailed: false,
      fetchSupportPersonListSuccess: false,
    };
  },
  [fetchSupportPersonListSuccess]: (state, data) => {
    return {
      ...state,
      fetchSupportPersonListInProgress: false,
      fetchSupportPersonListFailed: false,
      fetchSupportPersonListSuccess: true,
      supportPersonList: data.payload,
    };
  },
  [fetchSupportPersonListFailed]: (state) => {
    return {
      ...state,
      fetchSupportPersonListInProgress: false,
      fetchSupportPersonListFailed: true,
      fetchSupportPersonListSuccess: false,
    };
  },
  [fetchCancelCartSuccess]: (state) => ({
    ...state,
    fetchCancelCartFailed: false,
    fetchCancelCartProgress: false,
    fetchCancelCartSuccess: true,
    errorMsg: "",
  }),
  [fetchCancelCartProgress]: (state) => ({
    ...state,
    fetchCancelCartFailed: false,
    fetchCancelCartProgress: true,
    fetchCancelCartSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchCancelCartFailed]: (state) => ({
    ...state,
    fetchCancelCartFailed: true,
    fetchCancelCartProgress: false,
    fetchCancelCartSuccess: false,
  }),
  [fetchUpdatedStatusSuccess]: (state) => ({
    ...state,
    fetchUpdatedStatusFailed: false,
    fetchUpdatedStatusProgress: false,
    fetchUpdatedStatusSuccess: true,
    errorMsg: "",
  }),
  [fetchUpdatedStatusProgress]: (state) => ({
    ...state,
    fetchUpdatedStatusFailed: false,
    fetchUpdatedStatusProgress: true,
    fetchUpdatedStatusSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchUpdatedStatusFailed]: (state) => ({
    ...state,
    fetchUpdatedStatusFailed: true,
    fetchUpdatedStatusProgress: false,
    fetchUpdatedStatusSuccess: false,
  }),
});

export { orderModificationReducer };
