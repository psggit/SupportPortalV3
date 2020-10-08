import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
} from "./action";

const initialValue = {
  retailerNotesData: null,
  orderId: null,
  fetchSuccess: false,
  fetchFailed: false,
  fetchProgress: false,
  errorMsg: "",
};
const retailerNotesReducer = createReducer(initialValue, {
  [fetchRetailerNotesSuccess]: (state, data) => ({
    ...state,
    retailerNotesData: data.payload,
    fetchSuccess: true,
    fetchFailed: false,
    fetchProgress: false,
    errorMsg: "",
  }),
  [fetchRetailerNotesFailed]: (state) => ({
    ...state,
    fetchSuccess: false,
    fetchFailed: true,
    fetchProgress: false,
    errorMsg: "Something went wrong Please try again!",
  }),
  [fetchRetailerNotesProgress]: (state) => ({
    ...state,
    fetchProgress: true,
  }),
});
export { retailerNotesReducer };
