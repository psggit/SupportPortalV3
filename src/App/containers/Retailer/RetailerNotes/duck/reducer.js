import { createReducer } from "@reduxjs/toolkit";
import {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
  fetchRetailerNotesListSuccess,
  fetchRetailerNotesListFailure,
  fetchRetailerNotesListProgress,
} from "./action";

const initialState = {
  retailerNotesList: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
  retailerTypeNoteList: null,
  fetchRetailerNotesListSuccess: false,
  fetchRetailerNotesListFailure: false,
  fetchRetailerNotesListProgress: false,
};

const retailerNotesListReducer = createReducer(initialState, {
  [fetchNotesSuccessfull]: (state, data) => {
    console.log("retailerNotesListSuccess", data);
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
  [fetchRetailerNotesListSuccess]: (state, data) => {
    console.log("fetchRetailerNotesListSuccess", data.payload);
    return {
      ...state,
      fetchRetailerNotesListProgress: false,
      fetchRetailerNotesListFailure: false,
      fetchRetailerNotesListSuccess: true,
      errorMsg: "",
      retailerTypeNoteList: data.payload,
    };
  },
  [fetchRetailerNotesListFailure]: (state) => ({
    ...state,
    fetchRetailerNotesListProgress: false,
    fetchRetailerNotesListFailure: true,
    fetchRetailerNotesListSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchRetailerNotesListProgress]: (state) => {
    return {
      ...state,
      fetchRetailerNotesListProgress: true,
      fetchRetailerNotesListFailure: false,
      fetchRetailerNotesListSuccess: false,
    };
  },
});

export { retailerNotesListReducer };
