import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCustomerSuccessfull,
  fetchCustomerFailure,
  fetchCustomerInProgress,
} from "./actions";

const initialState = {
  message: ''
};

const customerReducer = createReducer(initialState, {
  [fetchCustomerInProgress]: (state) => ({
    ...state,
    message: null,
  }),
  [fetchCustomerFailure]: (state) => ({
    ...state,
    message: "Something went wrong, please try again",
  }),
  [fetchCustomerSuccessfull]: (state, action) => ({
    ...state,
    message: action.payload.message,
  })
});

export { customerReducer };
