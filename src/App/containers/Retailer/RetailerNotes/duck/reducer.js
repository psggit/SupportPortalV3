import { createReducer } from "@reduxjs/toolkit";
import {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
  fetchIssueListSuccess,
  fetchIssueListFailure,
  fetchIssueListProgress,
} from "./action";

const initialState = {
  retailerNotesList: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
  issueListData: null,
  issueListSuccess: false,
  issueListProgress: false,
  issueListFail: false,
};

const retailerNotesListReducer = createReducer(initialState, {
  [fetchNotesSuccessfull]: (state, data) => {
    return {
      ...state,
      notesProgress: false,
      notesFail: false,
      notesSuccess: true,
      errorMsg: "",
      retailerNotesList: data.payload,
    };
  },
  [fetchNotesFailure]: (state) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchNotesInProgress]: (state) => {
    return {
      ...state,
      notesProgress: true,
      notesFail: false,
      notesSuccess: false,
    };
  },
  [fetchIssueListSuccess]: (state, data) => {
    return {
      ...state,
      issueListProgress: false,
      issueListFailure: false,
      issueListSuccess: true,
      errorMsg: "",
      issueListData: data.payload,
    };
  },
  [fetchIssueListFailure]: (state, data) => ({
    ...state,
    issueListProgress: false,
    issueListFailure: true,
    issueListSuccess: false,
    errorMsg: data.payload.message,
  }),
  [fetchIssueListProgress]: (state) => {
    return {
      ...state,
      issueListProgress: true,
      issueListFailure: false,
      issueListSuccess: false,
    };
  },
});

export { retailerNotesListReducer };
