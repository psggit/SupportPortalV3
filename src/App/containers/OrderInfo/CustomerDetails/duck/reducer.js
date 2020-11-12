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
     console.log("customer-reducer", data.payload);
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
    console.log("consumerNoteListSuccess-reducer", data.payload);
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
    // console.log("consumerNoteFailed");
    return {
      ...state,
      NoteListProgress: false,
      NoteListFailed: true,
      NoteListSuccess: false,
      errorMsg: data.payload.message,
    };
  },
  [consumerNoteListProgress]: (state) => {
    // console.log("consumerNoteListProgress");
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
