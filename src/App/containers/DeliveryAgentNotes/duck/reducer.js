import { createReducer } from "@reduxjs/toolkit";
import {
  fetchDANotesProgress,
  fetchDANotesFailure,
  fetchDANotesSuccess,
} from "./actions";

const initialState = {
  fetchDANotesProgress: true,
  fetchDANotesFailure: false,
  fetchDANotesSuccess: false,
  errorMsg: "",
  daNotes: null,
};

const daNotesReducer = createReducer(initialState, {
  [fetchDANotesProgress]: (state) => {
    return {
      ...state,
      fetchDANotesProgress: true,
      fetchDANotesFailure: false,
      fetchDANotesSuccess: false,
    }
  },
  [fetchDANotesFailure]: (state) => {
    return {
      ...state,
      fetchDANotesProgress: true,
      fetchDANotesFailure: true,
      fetchDANotesSuccess: false,
      errorMsg: "Something went wrong, please try again",
    }
  },
  [fetchDANotesSuccess]: (state, data) => {
    return {
      ...state,
      daNotes: data.payload.orderNotes,
      fetchDANotesProgress: true,
      fetchDANotesFailure: false,
      fetchDANotesSuccess: true,
      errorMsg: "",
    };
  },
});

export { daNotesReducer };
