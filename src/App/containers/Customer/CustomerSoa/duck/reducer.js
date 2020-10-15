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
    console.log("SOAsuccess", data);
    return {
      ...state,
      soaProgress: false,
      soaFail: false,
      soaSuccess: true,
      errorMsg: "",
      customerSoaList: data.payload,
    };
  },
  [fetchCustomerSoaFailure]: (state) => ({
    ...state,
    soaProgress: false,
    soaFail: true,
    soaSuccess: false,
    errorMsg: "Something went wrong! Please contact tech",
  }),
  [fetchCustomerSoaInProgress]: (state) => {
    console.log("soa-progress");
    return {
      ...state,
      soaProgress: true,
    };
  },
});

export { customerSOAReducer };
