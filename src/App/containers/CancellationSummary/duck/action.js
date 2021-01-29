import { createAction } from "@reduxjs/toolkit";

const triggerRefundSuccess = createAction("triggerRefundSuccess");
const triggerRefundFailed = createAction("triggerRefundFailed");
const triggerRefundProgress = createAction("triggerRefundProgress");

export { triggerRefundSuccess, triggerRefundFailed, triggerRefundProgress };
