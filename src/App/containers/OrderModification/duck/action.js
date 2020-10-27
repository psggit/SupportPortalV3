import { createAction } from "@reduxjs/toolkit";

const fetchOrderSuccess = createAction("fetchOrderSuccess");
const fetchOrderFailed = createAction("fetchOrderFailed");
const fetchOrderInProgress = createAction("fetchOrderInProgress");
const sendSMSInProgress = createAction("sendSMSInProgress");
const sendSMSSuccess = createAction("sendSMSSuccess");
const sendSMSFailed = createAction("sendSMSFailed");
const resolveOrderInProgress = createAction("resolveOrderInProgress");
const resolveOrderSuccess = createAction("resolveOrderSuccess");
const resolveOrderFailed = createAction("resolveOrderFailed");
const fetchSupportPersonListInProgress = createAction(
  "fetchSupportPersonListInProgress"
);
const fetchSupportPersonListSuccess = createAction(
  "fetchSupportPersonListSuccess"
);
const fetchSupportPersonListFailed = createAction(
  "fetchSupportPersonListFailed"
);

export {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderInProgress,
  sendSMSInProgress,
  sendSMSSuccess,
  sendSMSFailed,
  resolveOrderInProgress,
  resolveOrderSuccess,
  resolveOrderFailed,
  fetchSupportPersonListInProgress,
  fetchSupportPersonListSuccess,
  fetchSupportPersonListFailed,
};

// fetch list
// check status - success / pending / failed
// trigger SMS