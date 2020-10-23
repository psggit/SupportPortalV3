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
  [fetchActLogsFailure]: (state) => ({
    ...state,
    notesProgress: false,
    notesFail: true,
    notesSuccess: false,
    errorMsg: "Something went wrong, please try again",
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
