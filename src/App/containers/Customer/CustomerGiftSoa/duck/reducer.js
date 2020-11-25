import { createReducer } from "@reduxjs/toolkit";
import {
  fetchGiftSoaSuccess,
  fetchGiftSoaFailure,
  fetchGiftSoaProgress,
  resetOnUnmount,
} from "./actions";
import { setErrorMessage } from "../../../../utils/errorMessages";

const initialState = {
  customerGiftSoaList: null,
  giftSoaProgress: false,
  giftSoaFail: false,
  giftSoaSuccess: false,
  errorMsg: "",
};

const customerGiftSOAReducer = createReducer(initialState, {
  [fetchGiftSoaSuccess]: (state, data) => {
    return {
      ...state,
      giftSoaProgress: false,
      giftSoaFail: false,
      giftSoaSuccess: true,
      errorMsg: "",
      customerGiftSoaList: data.payload,
    };
  },
  [fetchGiftSoaFailure]: (state, error) => ({
    ...state,
    giftSoaProgress: false,
    giftSoaFail: true,
    giftSoaSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [fetchGiftSoaProgress]: (state) => {
    return {
      ...state,
      giftSoaProgress: true,
      giftSoaSuccess: false,
    };
  },
  [resetOnUnmount]: () => {
    return {
      ...initialState,
    };
  },
});

export { customerGiftSOAReducer };
