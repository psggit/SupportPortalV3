import { createAction } from "@reduxjs/toolkit";

const fetchCustomerSuccessfull = createAction("fetchCustomerSuccessfull");
const fetchCustomerFailure = createAction("fetchCustomerFailure");
const fetchCustomerInProgress = createAction("fetchCustomerInProgress");

export { fetchCustomerSuccessfull, fetchCustomerFailure, fetchCustomerInProgress };