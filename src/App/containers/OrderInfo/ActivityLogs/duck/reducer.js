import { createReducer } from "@reduxjs/toolkit";
import { fetchLogProgress, fetchLogFailed, fetchLogSuccess } from "./actions";

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
    let errorMessage =
      data.payload.message !== undefined
        ? data.payload.message
        : "Something went wrong. Try again later.";
    return {
      ...state,
      fetchLogSuccess: false,
      fetchLogFailed: true,
      fetchLogProgress: false,
      errorMsg: errorMessage,
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
