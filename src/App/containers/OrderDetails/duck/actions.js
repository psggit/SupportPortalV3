import { createAction } from "@reduxjs/toolkit";

const fetchOrderSuccess = createAction("fetchOrderSuccess");
const fetchOrderFailed = createAction("fetchOrderFailed");
const fetchOrderProgress = createAction("fetchOrderProgress");

const preponeOrderSuccess = createAction("preponeOrderSuccess");
const preponeOrderFailed = createAction("preponeOrderFailed");
const preponeOrderProgress = createAction("preponeOrderProgress");

const fetchDeliverySuccess = createAction("fetchDeliverySuccess");
const fetchDeliveryFailed = createAction("fetchDeliveryFailed");
const fetchDeliveryProgress = createAction("fetchDeliveryProgress");

const selectOrder = createAction("selectOrder");

export {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  selectOrder,
  preponeOrderSuccess,
  preponeOrderFailed,
  preponeOrderProgress,
  fetchDeliverySuccess,
  fetchDeliveryFailed,
  fetchDeliveryProgress,
};
