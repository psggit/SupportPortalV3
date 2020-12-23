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
  fetchUnreserveDASuccess,
  fetchUnreserveDAFailed,
  fetchUnreserveDAProgress,
  resetOnUnmount,
} from "./action";
import { setErrorMessage } from "../../../../utils/errorMessages";

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
  errorMessageUnreserve: "",
  errorDAList: "",
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
  fetchUnreserveDASuccess: false,
  fetchUnreserveDAFailed: false,
  fetchUnreserveDAProgress: false,
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
    return {
      ...state,
      fetchSuccess: false,
      fetchFailed: true,
      fetchProgress: false,
      errorMsg: setErrorMessage(data),
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
  [fetchDaIssueListFailure]: (state, data) => ({
    ...state,
    fetchDaIssueListSuccess: false,
    fetchDaIssueListFailure: true,
    fetchDaIssueListProgress: false,
    errorDAList: setErrorMessage(data),
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
    message: setErrorMessage(data),
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
  [fetchUnassignDAFailed]: (state, data) => ({
    ...state,
    unassignDASuccess: false,
    unassignDAFail: true,
    unassignDAProgress: false,
    errorMessageUnassign: setErrorMessage(data),
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
  [fetchReserveDAFailed]: (state, data) => ({
    ...state,
    reserveDaSuccess: false,
    reserveDaFail: true,
    reserveDAProgress: false,
    errorMessageReserve: setErrorMessage(data),
  }),
  [fetchReserveDAProgress]: (state) => ({
    ...state,
    reserveDAProgress: true,
    reserveDaSuccess: false,
    reserveDaFail: false,
  }),
  [fetchUnreserveDASuccess]: (state, data) => ({
    ...state,
    fetchUnreserveDASuccess: true,
    fetchUnreserveDAFailed: false,
    fetchUnreserveDAProgress: false,
    message: data.payload.message,
  }),
  [fetchUnreserveDAFailed]: (state, data) => ({
    ...state,
    fetchUnreserveDASuccess: false,
    fetchUnreserveDAFailed: true,
    fetchUnreserveDAProgress: false,
    errorMessageUnreserve: setErrorMessage(data),
  }),
  [fetchUnreserveDAProgress]: (state) => ({
    ...state,
    fetchUnreserveDASuccess: false,
    fetchUnreserveDAFailed: false,
    fetchUnreserveDAProgress: true,
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});
export { deliveryAgentReducer };
