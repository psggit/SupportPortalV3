import { createReducer } from "@reduxjs/toolkit";
import {
  fetchLiveDataProgress,
  fetchLiveDataSuccess,
  fetchLiveDataFailure,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../utils/errorMessages";

const initialValue = {
  fetchLiveDataProgress: false,
  fetchLiveDataSuccess: false,
  fetchLiveDataFailure: false,
  successMsg: "",
  errorMsg: "",
  trackData: null,
  message: "",
};

const orderTrackingReducer = createReducer(initialValue, {
  [fetchLiveDataProgress]: (state) => ({
    ...state,
    fetchLiveDataProgress: true,
    fetchLiveDataSuccess: false,
    fetchLiveDataFailure: false,
  }),
  [fetchLiveDataSuccess]: (state, data) => ({
    ...state,
    fetchLiveDataProgress: false,
    fetchLiveDataSuccess: true,
    fetchLiveDataFailure: false,
    trackData: data.payload,
    message: data.payload.message,
  }),
  [fetchLiveDataFailure]: (state, err) => ({
    ...state,
    fetchLiveDataProgress: false,
    fetchLiveDataSuccess: false,
    fetchLiveDataFailure: true,
    errorMsg: setErrorMessage(err),
    message: setErrorMessage(err),
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});

export { orderTrackingReducer };
