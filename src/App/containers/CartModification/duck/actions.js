import { createAction } from "@reduxjs/toolkit";

const fetchGenreSuccess = createAction("fetchGenreSuccess");
const fetchGenreFailed = createAction("fetchGenreFailed");
const fetchGenreProgress = createAction("fetchGenreProgress");

const fetchBrandSuccess = createAction("fetchBrandSuccess");
const fetchBrandFailed = createAction("fetchBrandFailed");
const fetchBrandProgress = createAction("fetchBrandProgress");

//event for adding an sku to cart
const addSkuToCart = createAction("addSkuToCart");

//event for removing an sku from cart
const removeSkuFromCart = createAction("removeSkuFromCart");

const updateFromCart = createAction("updateFromCart");

const brandPagination = createAction("brandPagination");

const searchSuccess = createAction("searchSuccess");
const searchFailed = createAction("searchFailed");
const searchProgress = createAction("searchProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchGenreSuccess,
  fetchGenreFailed,
  fetchGenreProgress,
  fetchBrandSuccess,
  fetchBrandFailed,
  fetchBrandProgress,
  addSkuToCart,
  removeSkuFromCart,
  updateFromCart,
  brandPagination,
  searchSuccess,
  searchFailed,
  searchProgress,
  resetOnUnmount,
};
