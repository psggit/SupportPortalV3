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
} from "./action";

const initialValue = {
  deliveryAgentNotesData: null,
  orderId: null,
  fetchSuccess: false,
  fetchFailed: false,
  fetchProgress: false,
  errorMsg: "",
  deliveryAgentList: null,
  daListSuccess: false,
  daListFail: false,
  daListProgress: false,
  successMsg: "",
  unassignDASuccess: false,
  unassignDAFail: false,
  unassignDAProgress: false,
  message: "",
  reserveDaSuccess: false,
  reserveDaFail: false,
  reserveDaProgress: false,
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
  [fetchDeliveryAgentNotesFailed]: (state) => ({
    ...state,
    fetchSuccess: false,
    fetchFailed: true,
    fetchProgress: false,
    errorMsg: "Something went wrong Please try again!",
  }),
  [fetchDeliveryAgentNotesProgress]: (state) => ({
    ...state,
    fetchProgress: true,
  }),
  [fetchDeliveryAgentListSuccess]: (state, data) => ({
    ...state,
    deliveryAgentList: data.payload,
    daListSuccess: true,
    daListFail: false,
    daListProgress: false,
    message: data.payload.message,
  }),
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
    //message: "No delivery agent has been assigned to the order yet.",
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
    //errorMsg: data.payload,
  }),
  [fetchReserveDAFailed]: (state) => ({
    ...state,
    reserveDaSuccess: false,
    reserveDaFail: true,
    reserveDAProgress: false,
    errorMsg:
      "Reserving the order for the delivery agent is not allowed at the current order state.",
  }),
  [fetchReserveDAProgress]: (state) => ({
    ...state,
    reserveDAProgress: true,
  }),
});
export { deliveryAgentReducer };
