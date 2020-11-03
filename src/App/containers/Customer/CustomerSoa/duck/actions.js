import { createAction } from "@reduxjs/toolkit";

const fetchCustomerSoaSuccessfull = createAction("fetchCustomerSoaSuccessfull");
const fetchCustomerSoaFailure = createAction("fetchCustomerSoaFailure");
const fetchCustomerSoaInProgress = createAction("fetchCustomerSoaInProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
  resetOnUnmount,
};
