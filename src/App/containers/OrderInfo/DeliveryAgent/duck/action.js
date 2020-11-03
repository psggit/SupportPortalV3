import { createAction } from "@reduxjs/toolkit";

const fetchDeliveryAgentNotesSuccess = createAction(
  "fetchDeliveryAgentNotesSuccess"
);
const fetchDeliveryAgentNotesFailed = createAction(
  "fetchDeliveryAgentNotesFailed"
);
const fetchDeliveryAgentNotesProgress = createAction(
  "fetchDeliveryAgentNotesProgress"
);

const fetchDeliveryAgentListSuccess = createAction(
  "fetchDeliveryAgentListSuccess"
);
const fetchDeliveryAgentListFailed = createAction(
  "fetchDeliveryAgentListFailed"
);
const fetchDeliveryAgentListProgress = createAction(
  "fetchDeliveryAgentListProgress"
);

const fetchUnassignDASuccess = createAction("fetchUnassignDASuccess");
const fetchUnassignDAFailed = createAction("fetchUnassignDAFailed");
const fetchUnassignDAProgress = createAction("fetchUnassignDAProgress");

const fetchReserveDASuccess = createAction("fetchReserveDASuccess");
const fetchReserveDAFailed = createAction("fetchReserveDAFailed");
const fetchReserveDAProgress = createAction("fetchReserveDAProgress");

const resetOnUnmount = createAction("resetOnUnmount");

export {
  fetchDeliveryAgentNotesSuccess,
  fetchDeliveryAgentNotesFailed,
  fetchDeliveryAgentNotesProgress,
  fetchDeliveryAgentListSuccess,
  fetchDeliveryAgentListFailed,
  fetchDeliveryAgentListProgress,
  fetchUnassignDASuccess,
  fetchUnassignDAFailed,
  fetchUnassignDAProgress,
  fetchReserveDASuccess,
  fetchReserveDAFailed,
  fetchReserveDAProgress,
  resetOnUnmount,
};
