import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
  resetOnUnmount,
} from "./actions";

const initialState = {
  customerSoaList: null,
  soaProgress: false,
  soaFail: false,
  soaSuccess: false,
  errorMsg: "",
};

const customerSOAReducer = createReducer(initialState, {
  [fetchCustomerSoaSuccessfull]: (state, data) => {
    return {
      ...state,
      soaProgress: false,
      soaFail: false,
      soaSuccess: true,
      errorMsg: "",
      customerSoaList: data.payload,
    };
  },
  [fetchCustomerSoaFailure]: (state, data) => {
    return {
      ...state,
      soaProgress: false,
      soaFail: true,
      soaSuccess: false,
      errorMsg: data.payload,
    };
  },
  [fetchCustomerSoaInProgress]: (state) => {
    return {
      ...state,
      soaProgress: true,
      soaSuccess: false,
    };
  },
  [resetOnUnmount]: () => {
    return {
      soaProgress: false,
      soaFail: false,
      soaSuccess: false,
      errorMsg: "",
    };
  },
});

export { customerSOAReducer };
