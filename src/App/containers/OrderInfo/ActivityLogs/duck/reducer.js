import { createReducer } from "@reduxjs/toolkit";
import { fetchLogProgress, fetchLogFailed, fetchLogSuccess } from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

const initialValue = {
  activityData: null,
  orderId: null,
  fetchLogSuccess: false,
  fetchLogFailed: false,
  fetchLogProgress: false,
  errorMsg: "",
};
const activityLogReducer = createReducer(initialValue, {
  [fetchLogSuccess]: (state, data) => ({
    ...state,
    activityData: data.payload,
    fetchLogSuccess: true,
    fetchLogFailed: false,
    fetchLogProgress: false,
    errorMsg: "",
  }),
  [fetchLogFailed]: (state, data) => {
    return {
      ...state,
      fetchLogSuccess: false,
      fetchLogFailed: true,
      fetchLogProgress: false,
      errorMsg: setErrorMessage(data),
    };
  },
  [fetchLogProgress]: (state) => ({
    ...state,
    fetchLogProgress: true,
    fetchLogSuccess: false,
    fetchLogFailed: false,
  }),
});
export { activityLogReducer };
