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

  [fetchRetailerIssueListSuccess]: (state, data) => ({
    ...state,
    retailerIssueList: data.payload,
    fetchRetailerIssueListSuccess: true,
    fetchRetailerIssueListFailure: false,
    fetchRetailerIssueListProgress: false,
    errorMsg: "",
  }),
  [fetchRetailerIssueListFailure]: (state) => ({
    ...state,
    fetchRetailerIssueListSuccess: false,
    fetchRetailerIssueListFailure: true,
    fetchRetailerIssueListProgress: false,
    errorMsg: "Something went wrong Please try again!",
  }),
  [fetchRetailerIssueListProgress]: (state) => ({
    ...state,
    fetchRetailerIssueListProgress: true,
  }),
});
export { retailerNotesReducer };
