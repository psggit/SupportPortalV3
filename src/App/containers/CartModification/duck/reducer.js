import { createReducer } from "@reduxjs/toolkit";
import {
  fetchGenreSuccess,
  fetchGenreFailed,
  fetchGenreProgress,
  addSkuToCart,
  removeSkuFromCart,
  updateFromCart,
} from "./actions";

import { addProduct, removeProduct } from "./cartOperations";

const initialValue = {
  genreData: null,
  brandData: null,
  activityLog: null,
  modifiedProducts: {},
  modifySuccess: false,
  fetchGenreProgress: false,
  fetchGenreFail: false,
  fetchGenreSuccess: false,
  errorMsg: "",
};

const cartModifyReducer = createReducer(initialValue, {
  [fetchGenreSuccess]: (state, data) => ({
    ...state,
    fetchGenreProgress: false,
    fetchGenreFail: false,
    fetchGenreSuccess: true,
    errorMsg: "",
    genreData: data.payload.genres,
  }),
  [fetchGenreFailed]: (state) => ({
    ...state,
    fetchGenreProgress: false,
    fetchGenreFail: true,
    fetchGenreSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchGenreProgress]: (state) => ({
    ...state,
    fetchGenreProgress: true,
  }),
  [addSkuToCart]: (state, sku) => {
    return addProduct(state, sku);
  },
  [removeSkuFromCart]: (state, sku) => {
    return removeProduct(state, sku);
  },
  [updateFromCart]: (state, data) => ({
    ...state,
    modifiedProducts: data.payload,
    modifySuccess: true,
  }),
});

export { cartModifyReducer };
