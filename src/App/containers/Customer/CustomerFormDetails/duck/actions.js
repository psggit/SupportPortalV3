import { createAction } from "@reduxjs/toolkit";

const consumerUpdateSuccess = createAction("consumerUpdateSuccess");
const consumerUpdateFailed = createAction("consumerUpdateFailed");
const consumerUpdateProgress = createAction("consumerUpdateProgress");

export { consumerUpdateSuccess, consumerUpdateFailed, consumerUpdateProgress };
