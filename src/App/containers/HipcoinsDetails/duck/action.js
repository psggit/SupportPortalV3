import { createAction } from "@reduxjs/toolkit";

const triggerEmailSuccess = createAction("triggerEmailSuccess");
const triggerEmailFailed = createAction("triggerEmailFailed");
const triggerEmailInProgress = createAction("triggerEmailInProgress");

export { triggerEmailSuccess, triggerEmailFailed, triggerEmailInProgress };
