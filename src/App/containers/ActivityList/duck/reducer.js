import { createReducer } from "@reduxjs/toolkit";
import {
  fetchActLogsSuccessfull,
  fetchActLogsFailure,
  fetchActLogsInProgress,
} from "./action";
import { setErrorMessage } from "../../../utils/errorMessages";

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
  [fetchActLogsFailure]: (state, error) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: setErrorMessage(error),
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
