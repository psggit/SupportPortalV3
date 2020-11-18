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
const fetchDaIssueListSuccess = createAction("fetchDaIssueListSuccess");
const fetchDaIssueListFailure = createAction("fetchDaIssueListFailure");
const fetchDaIssueListProgress = createAction("fetchDaIssueListProgress");

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
  fetchDaIssueListProgress,
  fetchDaIssueListSuccess,
  fetchDaIssueListFailure,
  resetOnUnmount,
};
