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

export {
  fetchDeliveryAgentNotesSuccess,
  fetchDeliveryAgentNotesFailed,
  fetchDeliveryAgentNotesProgress,
};
