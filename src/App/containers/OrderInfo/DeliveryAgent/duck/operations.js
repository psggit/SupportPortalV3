import {
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
  fetchUnreserveDASuccess,
  fetchUnreserveDAFailed,
  fetchUnreserveDAProgress,
} from "./action";
// import { createSession } from "../../../utils";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";
import { daListAPI } from "../../../../utils/daListAPI";
import { unassignDaAPI } from "../../../../utils/unassignDaAPI";
import { reserveOrderAPI } from "../../../../utils";
import { daTypeNotesAPI } from "../../../../utils/daTypeNotesAPI";
import { unreserveOrderAPI } from "../../../../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliveryAgentNotesSuccess(data));
  };
};

const onSuccessIssue = (dispatch) => {
  return (data) => {
    dispatch(fetchDaIssueListSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchDeliveryAgentNotesFailed(error));
  };
};

const onErrorIssue = (dispatch) => {
  return (error) => {
    dispatch(fetchDaIssueListFailure(error));
  };
};

const daListSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliveryAgentListSuccess(data));
  };
};

const daListError = (dispatch) => {
  return (error) => {
    dispatch(fetchDeliveryAgentListFailed(error));
  };
};

const unassignDaSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchUnassignDASuccess(data));
  };
};

const unassignDaError = (dispatch) => {
  return (error) => {
    dispatch(fetchUnassignDAFailed(error));
  };
};

const reserveOrderSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchReserveDASuccess(data));
  };
};

const reserveOrderError = (dispatch) => {
  return (error) => {
    dispatch(fetchReserveDAFailed(error));
  };
};

const unreserveOrderSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchUnreserveDASuccess(data));
  };
};

const unreserveOrderError = (dispatch) => {
  return (error) => {
    dispatch(fetchUnreserveDAFailed(error));
  };
};

const fetchDeliveryAgentNotes = (orderId) => {
  const reqBody = {
    order_id: orderId,
    type: "delivery_agent",
  };
  return (dispatch) => {
    dispatch(fetchDeliveryAgentNotesProgress());
    fetchRetailerNotesAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const fetchDAList = (retailerId, orderId) => {
  let reqBody = {
    retailer_id: retailerId,
    order_id: orderId,
  };
  return (dispatch) => {
    dispatch(fetchDeliveryAgentListProgress());
    daListAPI(
      reqBody,
      processResponse(dispatch),
      daListSuccess(dispatch),
      daListError(dispatch)
    );
  };
};

const unassignDeliveryAgent = (orderId) => {
  let reqBody = {
    order_id: orderId,
  };
  return (dispatch) => {
    dispatch(fetchUnassignDAProgress());
    unassignDaAPI(
      reqBody,
      processResponse(dispatch),
      unassignDaSuccess(dispatch),
      unassignDaError(dispatch)
    );
  };
};

const reserveDeliveryAgent = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchReserveDAProgress());
    reserveOrderAPI(
      reqBody,
      processResponse(dispatch),
      reserveOrderSuccess(dispatch),
      reserveOrderError(dispatch)
    );
  };
};

const fetchDaIssueList = () => {
  return (dispatch) => {
    dispatch(fetchDaIssueListProgress());
    daTypeNotesAPI(
      processResponse(dispatch),
      onSuccessIssue(dispatch),
      onErrorIssue(dispatch)
    );
  };
};

const unreserveDeliveryAgent = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchUnreserveDAProgress());
    unreserveOrderAPI(
      reqBody,
      processResponse(dispatch),
      unreserveOrderSuccess(dispatch),
      unreserveOrderError(dispatch)
    );
  };
};

export {
  fetchDeliveryAgentNotes,
  fetchDAList,
  unassignDeliveryAgent,
  reserveDeliveryAgent,
  fetchDaIssueList,
  unreserveDeliveryAgent,
};
