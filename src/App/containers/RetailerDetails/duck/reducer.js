import { createReducer } from "@reduxjs/toolkit";
import { fetchRetailerNotesSuccess, fetchRetailerNotesFailed, fetchRetailerNotesProgress } from './action';

const initialValue = {
  retailerNotesData: null,
  orderId: null,
  fetchSuccess: false,
  fetchFailed: false,
  fetchProgress: true,
  errorMsg: "",
};
const retailerNotesReducer = createReducer(initialValue, {
  [fetchRetailerNotesSuccess]: (state, data) => {
    console.log("retailer notes success")
    return {
      ...state,
      retailerNotesData: data.payload,
      fetchSuccess: true,
      fetchFailed: false,
      fetchProgress: false,
      errorMsg: "",
    }
  },
  [fetchRetailerNotesFailed]: (state) => {
    console.log("retailer notes failed")
    return {
    ...state,
    fetchSuccess: false,
    fetchFailed: true,
    fetchProgress: false,
    errorMsg: "Something went wrong Please try again!",
    }
  },
  [fetchRetailerNotesProgress]: (state) => {
    console.log("retailer notes progress")
    return {
      ...state,
      fetchProgress: true,
    }
  }
})
export { retailerNotesReducer };