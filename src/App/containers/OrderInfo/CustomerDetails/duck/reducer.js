import { createReducer } from "@reduxjs/toolkit";
//import { data } from "../mockData";
import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
} from "./actions";

const initialValue = {
  customerNotesData: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
};

const customerReducer = createReducer(initialValue, {
  [fetchNotesSuccess]: (state, data) => {
    return {
      ...state,
      notesProgress: false,
      notesFail: false,
      notesSuccess: true,
      errorMsg: "",
      customerNotesData: data.payload,
    };
  },
  [fetchNotesFailed]: (state) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchNotesProgress]: (state) => {
    return {
      ...state,
      notesProgress: true,
    };
  },
});

export { customerReducer };
