import { createReducer } from "@reduxjs/toolkit";
import { data } from "../mockData";
import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
} from "./actions";

const initialValue = {
  notesData: null,
  notesProgress: true,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
};

const customerReducer = createReducer(initialValue, {
  [fetchNotesSuccess]: (state, data) => ({
    ...state,
    notesProgress: false,
    notesFail: false,
    notesSuccess: true,
    errorMsg: "",
    notesData: data.payload.orderNotes,
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
    notesFail: false,
    notesSuccess: false,
  }),
});

export { customerReducer };
