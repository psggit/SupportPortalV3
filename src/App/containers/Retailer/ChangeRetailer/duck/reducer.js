import { createReducer } from "@reduxjs/toolkit";
import {
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
  reassignRetailerProgress,
  reassignRetailerFailed,
  reassignRetailerSuccess,
} from "./action";

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
};

const listRetailerReducer = createReducer(initialValue, {
  [listRetailerSuccess]: (state, data) => ({
    ...state,
    listRetailerData: data.payload,
    listRetailerProgress: false,
    listRetailerFailed: false,
    listRetailerSuccess: true,
    errorMsg: "",
  }),
  [listRetailerFailed]: (state) => ({
    ...state,
    listRetailerProgress: false,
    listRetailerFailed: true,
    listRetailerSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [listRetailerProgress]: (state) => ({
    ...state,
    listRetailerProgress: true,
  }),

  [reassignRetailerSuccess]: (state, data) => ({
    ...state,
    reassignRetailerData: data.payload,
    reassignRetailerProgress: false,
    reassignRetailerFailed: false,
    reassignRetailerSuccess: true,
    errorMsg: "",
  }),
  [reassignRetailerFailed]: (state) => ({
    ...state,
    reassignRetailerProgress: false,
    reassignRetailerFailed: true,
    reassignRetailerSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [reassignRetailerProgress]: (state) => ({
    ...state,
    reassignRetailerProgress: true,
  }),
});
export { listRetailerReducer };
