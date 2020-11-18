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
  [fetchDeliveryAgentNotesFailed]: (state, error) => ({
    ...state,
    fetchSuccess: false,
    fetchFailed: true,
    fetchProgress: false,
    errorMsg: error.payload.message,
  }),
  [fetchDeliveryAgentNotesProgress]: (state) => ({
    ...state,
    fetchProgress: true,
  }),

  [fetchDaIssueListSuccess]: (state, data) => {
    return {
      ...state,
      daIssueList: data.payload,
      fetchDaIssueListSuccess: true,
      fetchDaIssueListFailure: false,
      fetchDaIssueListProgress: false,
      errorMsg: "",
    };
  },
  [fetchDaIssueListFailure]: (state, error) => ({
    ...state,
    fetchDaIssueListSuccess: false,
    fetchDaIssueListFailure: true,
    fetchDaIssueListProgress: false,
    errorMsg: error.payload.message,
  }),
  [fetchDaIssueListProgress]: (state) => ({
    ...state,
    fetchDaIssueListProgress: true,
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
    errorMsg: error.payload.message,
  }),
  [fetchUnassignDAProgress]: (state) => ({
    ...state,
    unassignDAProgress: true,
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
    errorMsg: error.payload.message,
  }),
  [fetchReserveDAProgress]: (state) => ({
    ...state,
    reserveDAProgress: true,
  }),
  [resetOnUnmount]: () => ({
    fetchSuccess: false,
    fetchFailed: false,
    fetchProgress: false,
    errorMsg: "",
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
