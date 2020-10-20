import { createReducer } from "@reduxjs/toolkit";
import {
  fetchDeliveryAgentNotesSuccess,
  fetchDeliveryAgentNotesFailed,
  fetchDeliveryAgentNotesProgress,
} from "./action";

const initialValue = {
  deliveryAgentNotesData: null,
  orderId: null,
  fetchSuccess: false,
  fetchFailed: false,
  fetchProgress: false,
  errorMsg: "",
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
});
export { deliveryAgentReducer };
