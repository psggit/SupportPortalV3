import { createReducer } from "@reduxjs/toolkit";
import {
  fetchLiveDataProgress,
  fetchLiveDataSuccess,
  fetchLiveDataFailure,
  resetOnUnmount,
} from "./actions";

const initialValue = {
  fetchLiveDataProgress: false,
  fetchLiveDataSuccess: false,
  fetchLiveDataFailure: false,
  successMsg: "",
  errorMsg: "",
  trackData: null,
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
    fetchLiveDataFailure: true,
    trackData: data.payload,
  }),
  [fetchLiveDataFailure]: (state, err) => ({
    ...state,
    fetchLiveDataProgress: false,
    fetchLiveDataSuccess: false,
    fetchLiveDataFailure: true,
    errorMsg: err,
  }),
  [resetOnUnmount]: () => ({
    ...initialValue,
  }),
});

export { orderTrackingReducer };
