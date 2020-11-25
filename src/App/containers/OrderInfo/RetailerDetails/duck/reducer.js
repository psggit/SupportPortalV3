import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
  fetchRetailerIssueListSuccess,
  fetchRetailerIssueListFailure,
  fetchRetailerIssueListProgress,
} from "./action";
import { setErrorMessage } from "../../../../utils/errorMessages";

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
    return {
      ...state,
      fetchSuccess: false,
      fetchFailed: true,
      fetchProgress: false,
      errorMsg: setErrorMessage(data),
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
  [fetchRetailerIssueListFailure]: (state, data) => ({
    ...state,
    fetchRetailerIssueListSuccess: false,
    fetchRetailerIssueListFailure: true,
    fetchRetailerIssueListProgress: false,
    errorMessage: setErrorMessage(data),
  }),
  [fetchRetailerIssueListProgress]: (state) => ({
    ...state,
    fetchRetailerIssueListProgress: true,
    fetchRetailerIssueListSuccess: false,
    fetchRetailerIssueListFailure: false,
  }),
});
export { retailerNotesReducer };
