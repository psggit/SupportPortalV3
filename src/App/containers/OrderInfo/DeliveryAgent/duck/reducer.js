import { createReducer } from "@reduxjs/toolkit";
import {
  fetchDeliveryAgentNotesSuccess,
  fetchDeliveryAgentNotesFailed,
  fetchDeliveryAgentNotesProgress,
  fetchDeliveryAgentListSuccess,
  fetchDeliveryAgentListFailed,
  fetchDeliveryAgentListProgress,
  fetchUnassignDASuccess,
  fetchUnassignDAFailed,
  fetchUnassignDAProgress,
  fetchReserveDASuccess,
  fetchReserveDAFailed,
  fetchReserveDAProgress,
  fetchDaIssueListProgress,
  fetchDaIssueListSuccess,
  fetchDaIssueListFailure,
  resetOnUnmount,
} from "./action";

const initialValue = {
  deliveryAgentNotesData: null,
  orderId: null,
  daIssueList: null,
  fetchSuccess: false,
  fetchFailed: false,
  fetchProgress: false,
  errorMsg: "",
  errorMessageReserve: "",
  errorMessageUnassign: "",
  deliveryAgentList: null,
  daListSuccess: false,
  daListFail: false,
  daListProgress: false,
  unassignDASuccess: false,
  unassignDAFail: false,
  unassignDAProgress: false,
  message: "",
  reserveDaSuccess: false,
  reserveDaFail: false,
  reserveDaProgress: false,
  fetchDaIssueListProgress: false,
  fetchDaIssueListSuccess: false,
  fetchDaIssueListFailure: false,
};
const deliveryAgentReducer = createReducer(initialValue, {
  [fetchDeliveryAgentNotesSuccess]: (state, data) => {
    return {
      ...state,
      deliveryAgentNotesData: data.payload,
      fetchSuccess: true,
      fetchFailed: false,
      fetchProgress: false,
      errorMsg: "",
    };
  },
  [fetchDeliveryAgentNotesFailed]: (state, data) => {
    let errorMessage =
      data.payload.message !== undefined
        ? data.payload.message
        : "Something went wrong. Try again later.";
    return {
      ...state,
      fetchSuccess: false,
      fetchFailed: true,
      fetchProgress: false,
      errorMsg: errorMessage,
    };
  },
  [fetchDeliveryAgentNotesProgress]: (state) => ({
    ...state,
    fetchProgress: true,
    fetchSuccess: false,
    fetchFailed: false,
  }),

  [fetchDaIssueListSuccess]: (state, data) => {
    return {
      ...state,
      daIssueList: data.payload,
      fetchDaIssueListSuccess: true,
      fetchDaIssueListFailure: false,
      fetchDaIssueListProgress: false,
    };
  },
  [fetchDaIssueListFailure]: (state, error) => ({
    ...state,
    fetchDaIssueListSuccess: false,
    fetchDaIssueListFailure: true,
    fetchDaIssueListProgress: false,
    errorMessageUnassign: error.payload.message,
  }),
  [fetchDaIssueListProgress]: (state) => ({
    ...state,
    fetchDaIssueListProgress: true,
    fetchDaIssueListFailure: false,
    fetchDaIssueListSuccess: false,
  }),

  [fetchDeliveryAgentListSuccess]: (state, data) => {
    return {
      ...state,
      deliveryAgentList: data.payload,
      daListSuccess: true,
      daListFail: false,
      daListProgress: false,
      message: data.payload.message,
    };
  },
  [fetchDeliveryAgentListFailed]: (state, data) => ({
    ...state,
    daListSuccess: false,
    daListFail: true,
    daListProgress: false,
    message: data.payload.message,
  }),
  [fetchDeliveryAgentListProgress]: (state) => ({
    ...state,
    daListProgress: true,
    daListSuccess: false,
    daListFail: false,
  }),
  [fetchUnassignDASuccess]: (state, data) => ({
    ...state,
    unassignDASuccess: true,
    unassignDAFail: false,
    unassignDAProgress: false,
    message: data.payload.message,
  }),
  [fetchUnassignDAFailed]: (state, error) => ({
    ...state,
    unassignDASuccess: false,
    unassignDAFail: true,
    unassignDAProgress: false,
    errorMessage: error.payload.message,
  }),
  [fetchUnassignDAProgress]: (state) => ({
    ...state,
    unassignDAProgress: true,
    unassignDAFail: false,
    unassignDASuccess: false,
  }),
  [fetchReserveDASuccess]: (state, data) => ({
    ...state,
    reserveDaSuccess: true,
    reserveDAFail: false,
    reserveDAProgress: false,
    message: data.payload.message,
  }),
  [fetchReserveDAFailed]: (state, error) => ({
    ...state,
    reserveDaSuccess: false,
    reserveDaFail: true,
    reserveDAProgress: false,
    errorMessageReserve: error.payload.message,
  }),
  [fetchReserveDAProgress]: (state) => ({
    ...state,
    reserveDAProgress: true,
    reserveDaSuccess: false,
    reserveDaFail: false,
  }),
  [resetOnUnmount]: () => ({
    fetchSuccess: false,
    fetchFailed: false,
    fetchProgress: false,
    errorMsg: "",
    errorMessageReserve: "",
    errorMessageUnassign: "",
    deliveryAgentList: null,
    daListSuccess: false,
    daListFail: false,
    daListProgress: false,
    unassignDASuccess: false,
    unassignDAFail: false,
    unassignDAProgress: false,
    message: "",
    reserveDaSuccess: false,
    reserveDaFail: false,
    reserveDaProgress: false,
    fetchDaIssueListProgress: false,
    fetchDaIssueListSuccess: false,
    fetchDaIssueListFailure: false,
  }),
});
export { deliveryAgentReducer };
