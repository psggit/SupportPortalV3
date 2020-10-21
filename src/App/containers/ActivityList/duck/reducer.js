import { createReducer } from "@reduxjs/toolkit";
import {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
} from "./action";

const initialState = {
  retailerNotesList: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
};

const acitivityListReducer = createReducer(initialState, {
  [fetchNotesSuccessfull]: (state, data) => {
    console.log("retailerNotesListSuccess", data);
    return {
      ...state,
      notesProgress: false,
      notesFail: false,
      notesSuccess: true,
      errorMsg: "",
      activityLogs: data.payload,
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
    console.log("retailerNotes");
    return {
      ...state,
      notesProgress: true,
    };
  },
});

export { acitivityListReducer };
