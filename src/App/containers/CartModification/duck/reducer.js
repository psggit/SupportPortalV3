/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable no-undef */
import { createReducer } from "@reduxjs/toolkit";
import {
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
} from "./actions";

declare type Product = {
  skuId: number,
  brandName: string,
  brandId: number,
  image: string,
  price: number,
  volume: number,
  count: number,
  available: boolean,
  subText: string,
};

declare type Products = {
  [skuId: string]: Product,
};

declare type Sku = {
  retailerId: number,
  retailerName: string,
  retailerDescription: string,
  sku_id: number,
  brand_name: string,
  logo_low_res_image: string,
  brand_id: number,
  price: number,
  volume: number,
  clearCart: boolean,
};

declare type State = {
  cartProducts: Products,
  modifySuccess: boolean,
  fetchGenreProgress: boolean,
  fetchGenreFail: boolean,
  fetchGenreSuccess: boolean,
  fetchBrandProgress: boolean,
  fetchBrandProgress: boolean,
  errorMsg: string,
  pendingSku: Sku,
};

const initialValue = (): State => {
  return {
    genreData: null,
    brandData: {},
    activityLog: null,
    cartProducts: {},
    modifySuccess: false,
    fetchGenreProgress: false,
    fetchGenreFail: false,
    fetchGenreSuccess: false,
    fetchBrandProgress: false,
    fetchBrandFail: false,
    fetchBrandSuccess: false,
    searchSuccess: false,
    searchFailed: false,
    searchProgress: false,
    errorMsg: "",
  };
};

const unAvailableProductText = "Product is not available";

let getProductFromSku = (sku: Sku): Product => {
  return {
    sku_id: sku.sku_id,
    brand_name: sku.brand_name,
    brand_id: sku.brand_id,
    price: sku.price,
    volume: sku.volume,
    ordered_count: 1,
    available: true,
    subText: unAvailableProductText,
  };
};

let addProduct = (state: State, sku: sku): State => {
  let prod = state.cartProducts[sku.sku_id.toString()];
  if (prod === undefined) {
    prod = getProductFromSku(sku);
  } else {
    prod.ordered_count += 1;
  }
  console.clear();
  console.log(sku);
  state.cartProducts[prod.sku_id.toString()] = prod;
  return state;
};

let removeProduct = (state: State, sku: sku): State => {
  let prod = state.cartProducts[sku.sku_id.toString()];
  if (prod === undefined) {
    return state;
  } else {
    prod.ordered_count -= 1;
  }
  if (prod.ordered_count === 0) {
    delete state.cartProducts[prod.sku_id.toString()];
  }
  return state;
};

let newState;

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
  [fetchBrandSuccess]: (state, data) => ({
    ...state,
    fetchBrandProgress: false,
    fetchBrandFail: false,
    fetchBrandSuccess: true,
    errorMsg: "",
    brandData: data.payload.brands,
  }),
  [fetchBrandFailed]: (state) => ({
    ...state,
    fetchBrandProgress: false,
    fetchBrandFail: true,
    fetchBrandSuccess: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [fetchBrandProgress]: (state) => ({
    ...state,
    fetchBrandFail: false,
    fetchBrandSuccess: false,
    fetchBrandProgress: true,
  }),
  [addSkuToCart]: (state: State, sku) => {
    return void addProduct(state, sku.payload);
  },
  [removeSkuFromCart]: (state, sku) => {
    return removeProduct(state, sku.payload);
  },
  [updateFromCart]: (state, data) => ({
    ...state,
    cartProducts: data.payload,
    modifySuccess: true,
  }),
  [brandPagination]: (state, data) => {
    newState = {
      ...state,
      fetchBrandSuccess: true,
      fetchBrandProgress: false,
      fetchBrandFail: false,
      brandData: [...state.brandData, ...data.payload.brands],
    };
    return newState;
  },
  // [searchSuccess]: (state, data) => ({
  //   ...state,
  //   searchProgress: false,
  //   searchFailed: false,
  //   searchSuccess: true,
  //   errorMsg: "",
  //   brandData: data.payload.brand_list,
  // }),
  [searchSuccess]: (state, data) => {
    newState = {
      ...state,
      searchProgress: false,
      searchFailed: false,
      searchSuccess: true,
      fetchBrandSuccess: true,
      fetchBrandProgress: false,
      fetchBrandFail: false,
      brandData: data.payload.brand_list,
    };
    return newState;
  },
  [searchFailed]: (state) => ({
    ...state,
    searchProgress: false,
    searchFailed: true,
    searchSuccess: false,
    fetchBrandSuccess: false,
    fetchBrandProgress: false,
    fetchBrandFail: false,
    errorMsg: "Something went wrong, please try again",
  }),
  [searchProgress]: (state) => ({
    ...state,
    searchFailed: false,
    searchSuccess: false,
    searchProgress: true,
    fetchGenreSuccess: false,
    fetchGenreProgress: false,
    fetchGenreFail: false,
    fetchBrandSuccess: false,
    fetchBrandProgress: false,
    fetchBrandFail: false,
  }),
  [resetOnUnmount]: (state) => ({
    genreData: null,
    brandData: {},
    activityLog: null,
    cartProducts: {},
    modifySuccess: false,
    fetchGenreProgress: false,
    fetchGenreFail: false,
    fetchGenreSuccess: false,
    fetchBrandProgress: false,
    fetchBrandFail: false,
    fetchBrandSuccess: false,
    searchSuccess: false,
    searchFailed: false,
    searchProgress: false,
    errorMsg: "",
  }),
});

export { cartModifyReducer };
