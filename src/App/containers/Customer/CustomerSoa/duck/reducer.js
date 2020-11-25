import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

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
  [fetchCustomerSoaFailure]: (state, error) => {
    return {
      ...state,
      soaProgress: false,
      soaFail: true,
      soaSuccess: false,
      errorMsg: setErrorMessage(error),
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
      ...initialState,
    };
  },
});

export { customerSOAReducer };
