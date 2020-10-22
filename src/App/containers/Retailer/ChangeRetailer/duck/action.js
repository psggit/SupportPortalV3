import { createAction } from "@reduxjs/toolkit";

const listRetailerSuccess = createAction("listRetailerSuccess");
const listRetailerFailed = createAction("listRetailerFailed");
const listRetailerProgress = createAction("listRetailerProgress");

export { listRetailerSuccess, listRetailerFailed, listRetailerProgress };
