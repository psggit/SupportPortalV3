import { createReducer } from "@reduxjs/toolkit";
import {
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
} from "./action";

const initialValue = {
  listRetailerData: null,
  listRetailerSuccess: false,
  listRetailerFailed: false,
  listRetailerProgress: false,
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
});
export { listRetailerReducer };
