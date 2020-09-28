import { createAction } from "@reduxjs/toolkit";

const fetchCustomerSoaSuccessfull = createAction("fetchCustomerSoaSuccessfull");
const fetchCustomerSoaFailure = createAction("fetchCustomerSoaFailure");
const fetchCustomerSoaInProgress = createAction("fetchCustomerSoaInProgress");

export { fetchCustomerSoaSuccessfull, fetchCustomerSoaFailure, fetchCustomerSoaInProgress };