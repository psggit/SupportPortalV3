import { createReducer } from "@reduxjs/toolkit";
import {
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
  reassignRetailerProgress,
  reassignRetailerFailed,
  reassignRetailerSuccess,
  resetOnUnmount,
} from "./action";
import { setErrorMessage } from "../../../../utils/errorMessages";

const initialValue = {
  listRetailerData: null,
  reassignRetailerData: null,
  listRetailerSuccess: false,
  listRetailerFailed: false,
  listRetailerProgress: false,
  reassignRetailerProgress: false,
  reassignRetailerFailed: false,
  reassignRetailerSuccess: false,
  errorMsg: "",
  errorMessage: "",
  successMsg: "",
};

const listRetailerReducer = createReducer(initialValue, {
  [listRetailerSuccess]: (state, data) => ({
    ...state,
    listRetailerData: data.payload,
    listRetailerProgress: false,
    listRetailerFailed: false,
    listRetailerSuccess: true,
    errorMsg: "",
    successMsg: data.payload.message,
  }),
  [listRetailerFailed]: (state, data) => ({
    ...state,
    listRetailerProgress: false,
    listRetailerFailed: true,
    listRetailerSuccess: false,
    errorMsg: setErrorMessage(data),
  }),
  [listRetailerProgress]: (state) => ({
    ...state,
    listRetailerProgress: true,
    listRetailerFailed: false,
    listRetailerSuccess: false,
  }),

  [reassignRetailerSuccess]: (state, data) => ({
    ...state,
    reassignRetailerData: data.payload,
    reassignRetailerProgress: false,
    reassignRetailerFailed: false,
    reassignRetailerSuccess: true,
    errorMessage: "",
    successMsg: data.payload.message,
  }),
  [reassignRetailerFailed]: (state, data) => {
    return {
      ...state,
      reassignRetailerProgress: false,
      reassignRetailerFailed: true,
      reassignRetailerSuccess: false,
      errorMessage: setErrorMessage(data),
    };
  },
  [reassignRetailerProgress]: (state) => ({
    ...state,
    reassignRetailerProgress: true,
    reassignRetailerFailed: false,
    reassignRetailerSuccess: false,
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});
export { listRetailerReducer };
