import { createReducer } from "@reduxjs/toolkit";
import {
  fetchActLogsSuccessfull,
  fetchActLogsFailure,
  fetchActLogsInProgress,
} from "./action";

const initialState = {
  activityLogs: null,
  notesProgress: false,
  notesFail: false,
  notesSuccess: false,
  errorMsg: "",
};

const acitivityListReducer = createReducer(initialState, {
  [fetchActLogsSuccessfull]: (state, data) => {
    return {
      ...state,
      notesProgress: false,
      notesFail: false,
      notesSuccess: true,
      errorMsg: "",
      activityLogs: data.payload,
    };
  },
  [fetchActLogsFailure]: (state, data) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: data.payload.message,
  }),
  [fetchActLogsInProgress]: (state) => {
    return {
      ...state,
      notesProgress: true,
      notesSuccess: false,
    };
  },
});

export { acitivityListReducer };
