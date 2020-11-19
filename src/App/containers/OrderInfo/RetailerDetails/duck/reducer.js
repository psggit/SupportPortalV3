import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
  fetchRetailerIssueListSuccess,
  fetchRetailerIssueListFailure,
  fetchRetailerIssueListProgress,
} from "./action";

const initialValue = {
  retailerNotesData: null,
  retailerIssueList: null,
  orderId: null,
  fetchSuccess: false,
  fetchFailed: false,
  fetchProgress: false,
  fetchRetailerIssueListSuccess: false,
  fetchRetailerIssueListFailure: false,
  fetchRetailerIssueListProgress: false,
  errorMsg: "",
  errorMessage: "",
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
  [fetchRetailerNotesFailed]: (state, data) => {
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
  [fetchRetailerNotesProgress]: (state) => ({
    ...state,
    fetchProgress: true,
    fetchSuccess: false,
    fetchFailed: false,
  }),

  [fetchRetailerIssueListSuccess]: (state, data) => ({
    ...state,
    retailerIssueList: data.payload,
    fetchRetailerIssueListSuccess: true,
    fetchRetailerIssueListFailure: false,
    fetchRetailerIssueListProgress: false,
    errorMessage: "",
  }),
  [fetchRetailerIssueListFailure]: (state) => ({
    ...state,
    fetchRetailerIssueListSuccess: false,
    fetchRetailerIssueListFailure: true,
    fetchRetailerIssueListProgress: false,
    errorMessage: "Something went wrong. Please try again!",
  }),
  [fetchRetailerIssueListProgress]: (state) => ({
    ...state,
    fetchRetailerIssueListProgress: true,
    fetchRetailerIssueListSuccess: false,
    fetchRetailerIssueListFailure: false,
  }),
});
export { retailerNotesReducer };
