import { createReducer } from "@reduxjs/toolkit";
import {
  fetchGiftSoaSuccess,
  fetchGiftSoaFailure,
  fetchGiftSoaProgress,
} from "./actions";

const initialState = {
  customerGiftSoaList: null,
  giftSoaProgress: false,
  giftSoaFail: false,
  giftSoaSuccess: false,
  errorMsg: "",
};

const customerGiftSOAReducer = createReducer(initialState, {
  [fetchGiftSoaSuccess]: (state, data) => {
    console.log("gift-soa-success", data);
    return {
      ...state,
      giftSoaProgress: false,
      giftSoaFail: false,
      giftSoaSuccess: true,
      errorMsg: "",
      customerGiftSoaList: data.payload,
    };
  },
  [fetchGiftSoaFailure]: (state) => ({
    ...state,
    giftSoaProgress: false,
    giftSoaFail: true,
    giftSoaSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchGiftSoaProgress]: (state) => {
    console.log("gift-soa-progress");
    return {
      ...state,
      giftSoaProgress: true,
    };
  },
});

export { customerGiftSOAReducer };
