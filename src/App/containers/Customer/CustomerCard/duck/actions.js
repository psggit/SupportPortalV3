/* eslint-disable prettier/prettier */
import { createAction } from "@reduxjs/toolkit";

const fetchCustomerNotesSuccessfull = createAction("fetchCustomerNotesSuccessfull");
const fetchCustomerNotesFailure = createAction("fetchCustomerNotesFailure");
const fetchCustomerNotesInProgress = createAction("fetchCustomerNotesInProgress");

export { fetchCustomerNotesSuccessfull, fetchCustomerNotesFailure, fetchCustomerNotesInProgress };