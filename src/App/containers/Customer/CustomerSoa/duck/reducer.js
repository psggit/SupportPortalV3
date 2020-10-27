import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
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
    // console.log("SOAsuccess", data);
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
    console.log("soa-fail", data.payload.message);
    return {
      ...state,
      soaProgress: false,
      soaFail: true,
      soaSuccess: false,
      errorMsg: data.payload.message,
    };
  },
  [fetchCustomerSoaInProgress]: (state) => {
    return {
      ...state,
      soaProgress: true,
      soaSuccess: false,
    };
  },
});

export { customerSOAReducer };
