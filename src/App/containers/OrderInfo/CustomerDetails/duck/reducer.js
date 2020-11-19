import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCustomerNotesSuccess,
  fetchCustomerNotesFailed,
  fetchCustomerNotesProgress,
  resetOnUnmount,
  consumerNoteListSuccess,
  consumerNoteListFailed,
  consumerNoteListProgress,
} from "./actions";

const initialValue = {
  customerNotesData: null,
  fetchCustomerNotesSuccess: false,
  fetchCustomerNotesFailed: false,
  fetchCustomerNotesProgress: false,
  errorMsg: "",
  errorMessage: "",
  succMsg: "",
  noteListData: null,
  NoteListSuccess: false,
  NoteListFailed: false,
  NoteListProgress: false,
};

const customerReducer = createReducer(initialValue, {
  [fetchCustomerNotesSuccess]: (state, data) => {
    return {
      ...state,
      fetchCustomerNotesSuccess: true,
      fetchCustomerNotesFailed: false,
      fetchCustomerNotesProgress: false,
      errorMsg: "",
      customerNotesData: data.payload,
    };
  },
  [fetchCustomerNotesFailed]: (state, data) => {
    let errorMessage =
      data.payload.message !== undefined
        ? data.payload.message
        : "Something went wrong. Try again later.";
    return {
      ...state,
      fetchCustomerNotesSuccess: false,
      fetchCustomerNotesFailed: true,
      fetchCustomerNotesProgress: false,
      errorMsg: errorMessage,
    };
  },
  [fetchCustomerNotesProgress]: (state) => {
    return {
      ...state,
      fetchCustomerNotesSuccess: false,
      fetchCustomerNotesFailed: false,
      fetchCustomerNotesProgress: true,
    };
  },
  [consumerNoteListSuccess]: (state, data) => {
    return {
      ...state,
      NoteListProgress: false,
      NoteListFailed: false,
      NoteListSuccess: true,
      errorMessage: "",
      noteListData: data.payload,
    };
  },
  [consumerNoteListFailed]: (state, data) => {
    return {
      ...state,
      NoteListProgress: false,
      NoteListFailed: true,
      NoteListSuccess: false,
      errorMessage: data.payload.message,
    };
  },
  [consumerNoteListProgress]: (state) => {
    return {
      ...state,
      NoteListProgress: true,
      NoteListFailed: false,
      NoteListSuccess: false,
    };
  },
  [resetOnUnmount]: () => {
    return {
      notesProgress: false,
      notesFail: false,
      notesSuccess: false,
      errorMsg: "",
      succMsg: "",
      errorMessage: "",
    };
  },
});

export { customerReducer };
