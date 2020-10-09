import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
} from "./actions";

const initialState = {
  //loading: false,
  CustomerSoaList: [],
  message: "",
};

const customerSOAReducer = createReducer(initialState, {
  [fetchCustomerSoaInProgress]: (state) => ({
    ...state,
    message: null,
  }),
  [fetchCustomerSoaFailure]: (state) => ({
    ...state,
    CustomerSoaList: [],
    message: "Something went wrong, please try again",
  }),
  [fetchCustomerSoaSuccessfull]: (state, action) => ({
    ...state,
    CustomerSoaList: action.payload,
    message: action.payload.message,
  }),
});

export { customerSOAReducer };
