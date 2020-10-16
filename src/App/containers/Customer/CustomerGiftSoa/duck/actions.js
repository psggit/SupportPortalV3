import { createAction } from "@reduxjs/toolkit";

const fetchGiftSoaSuccess = createAction("fetchGiftSoaSuccess");
const fetchGiftSoaFailure = createAction("fetchGiftSoaFailure");
const fetchGiftSoaProgress = createAction("fetchGiftSoaProgress");

export { fetchGiftSoaSuccess, fetchGiftSoaFailure, fetchGiftSoaProgress };
