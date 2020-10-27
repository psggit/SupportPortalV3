import { createReducer } from "@reduxjs/toolkit";
import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
} from "./actions";

const initialValue = {
  orderSummary: null,
  fetchGenreProgress: false,
  fetchGenreFailed: false,
  fetchGenreSuccess: false,
  errorMsg: "",
};

const cartReducer = createReducer(initialValue, {
  [fetchOrderSuccess]: (state, data) => ({
    ...state,
    fetchGenreProgress: false,
    fetchGenreFailed: false,
    fetchGenreSuccess: true,
    errorMsg: "",
    orderSummary: data.payload,
  }),
  [fetchOrderFailed]: (state) => ({
    ...state,
    fetchGenreProgress: false,
    fetchGenreFailed: true,
    fetchGenreSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchOrderProgress]: (state) => ({
    ...state,
    fetchGenreProgress: true,
    fetchGenreFailed: false,
    fetchGenreSuccess: false,
  }),
});

export { cartReducer };
