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
} from "./action";
// import { createSession } from "../../../utils";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";
import { daListAPI } from "../../../../utils/daListAPI";
import { unassignDaAPI } from "../../../../utils/unassignDaAPI";
import { reserveOrderAPI } from "../../../../utils";

const processResponse = () => {
  // console.log("[processResponse]");
  return (res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("invalid params");
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    // console.log("[onSuccess] data", data);
    dispatch(fetchDeliveryAgentNotesSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchDeliveryAgentNotesFailed(err));
  };
};

const daListSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliveryAgentListSuccess(data));
  };
};

const daListError = (dispatch) => {
  return (err) => {
    dispatch(fetchDeliveryAgentListFailed(err));
  };
};

const unassignDaSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchUnassignDASuccess(data));
  };
};

const unassignDaError = (dispatch) => {
  return (err) => {
    dispatch(fetchUnassignDAFailed(err));
  };
};

const reserveOrderSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchReserveDASuccess(data));
  };
};

const reserveOrderError = (dispatch) => {
  return (err) => {
    dispatch(fetchReserveDAFailed(err));
  };
};

const fetchDeliveryAgentNotes = (orderId) => {
  let reqBody = {
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

export {
  fetchDeliveryAgentNotes,
  fetchDAList,
  unassignDeliveryAgent,
  reserveDeliveryAgent,
};
