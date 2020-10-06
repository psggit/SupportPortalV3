// import { createReducer } from "@reduxjs/toolkit";
// import {
//   fetchCustomerNotesSuccessfull,
//   fetchCustomerNotesFailure,
//   fetchCustomerNotesInProgress,
// } from "./actions";

// const initialValue = {
//   notesData: null,
//   fetchCustomerNotesInProgress: false,
//   fetchCustomerNotesFailure: false,
//   fetchCustomerNotesStatus: false,
//   errorMsg: "",
// };

// const customerReducer = createReducer(initialValue, {
//   [fetchCustomerNotesSuccessfull]: (state, payload) => ({
//     ...state,
//     fetchCustomerNotesInProgress: false,
//     fetchCustomerNotesFailure: false,
//     fetchCustomerNotesStatus: true,
//     errorMsg: "",
//     notesData: payload.data,
//   }),
//   [fetchCustomerNotesFailure]: (state) => ({
//     ...state,
//     fetchCustomerNotesInProgress: false,
//     fetchCustomerNotesFailure: true,
//     fetchCustomerNotesStatus: false,
//     errorMsg: "Something went wrong, please try again",
//   }),
//   [fetchCustomerNotesInProgress]: (state) => ({
//     ...state,
//     fetchCustomerNotesInProgress: true,
//   }),
// });

// export { customerReducer };
