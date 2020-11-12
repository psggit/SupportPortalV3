import { createReducer } from "@reduxjs/toolkit";
import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
  resetOnUnmount,
  consumerNoteListSuccess,
  consumerNoteListFailed,
  consumerNoteListProgress,
} from "./actions";

const initialValue = {
  customerNotesData: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
  succMsg: "",
  noteListData: null,
  NoteListSuccess: false,
  NoteListFailed: false,
  NoteListProgress: false,
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
  [fetchNotesFailed]: (state, data) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: data.payload.message,
  }),
  [fetchNotesProgress]: (state) => {
    return {
      ...state,
      notesProgress: true,
    };
  },
  [consumerNoteListSuccess]: (state, data) => {
    return {
      ...state,
      NoteListProgress: false,
      NoteListFailed: false,
      NoteListSuccess: true,
      errorMsg: "",
      noteListData: data.payload,
    };
  },
  [consumerNoteListFailed]: (state, data) => {
    return {
      ...state,
      NoteListProgress: false,
      NoteListFailed: true,
      NoteListSuccess: false,
      errorMsg: data.payload.message,
    };
  },
  [consumerNoteListProgress]: (state) => {
    return {
      ...state,
      NoteListProgress: true,
    };
  },
  [resetOnUnmount]: () => {
    return {
      notesProgress: false,
      notesFail: false,
      notesSuccess: false,
      errorMsg: "",
      succMsg: "",
    };
  },
});

export { customerReducer };
