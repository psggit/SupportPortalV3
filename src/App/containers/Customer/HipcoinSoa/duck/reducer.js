import { createReducer } from "@reduxjs/toolkit";
import {
  fetchHipcoinSoaSuccess,
  fetchHipcoinSoaFailure,
  fetchHipcoinSoaProgress,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

const initialState = {
  hipcoinSoaList: null,
  hipcoinSoaProgress: false,
  hipcoinSoaFail: false,
  hipcoinSoaSuccess: false,
  errorMsg: "",
};

const hipcoinSOAReducer = createReducer(initialState, {
  [fetchHipcoinSoaSuccess]: (state, data) => {
    return {
      ...state,
      hipcoinSoaProgress: false,
      hipcoinSoaFail: false,
      hipcoinSoaSuccess: true,
      errorMsg: "",
      hipcoinSoaList: data.payload,
    };
  },
  [fetchHipcoinSoaFailure]: (state, error) => ({
    ...state,
    hipcoinSoaProgress: false,
    hipcoinSoaFail: true,
    hipcoinSoaSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [fetchHipcoinSoaProgress]: (state) => {
    return {
      ...state,
      hipcoinSoaProgress: true,
      hipcoinSoaSuccess: false,
    };
  },
  [resetOnUnmount]: () => {
    return {
      ...initialState,
    };
  },
});

export { hipcoinSOAReducer };
