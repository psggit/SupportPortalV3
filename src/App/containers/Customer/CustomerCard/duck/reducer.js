import { createReducer } from "@reduxjs/toolkit";
import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
} from "./actions";

const initialValue = {
  notesData: null,
  orderId: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
};

const customerReducer = createReducer(initialValue, {
  [fetchNotesSuccess]: (state, payload) => ({
    ...state,
    notesProgress: false,
    notesFail: false,
    notesSuccess: true,
    errorMsg: "",
    notesData: payload.data,
  }),
  [fetchNotesFailed]: (state) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchNotesProgress]: (state) => ({
    ...state,
    notesProgress: true,
  }),
});

export { customerReducer };
