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
} from "./action";
// import { createSession } from "../../../utils";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";
import { daListAPI } from "../../../../utils/daListAPI";
import { unassignDaAPI } from "../../../../utils/unassignDaAPI";
import { reserveOrderAPI } from "../../../../utils";
import { daTypeNotesAPI } from "../../../../utils/daTypeNotesAPI";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error("invalid params");
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
  return (err) => {
    dispatch(fetchDeliveryAgentNotesFailed(err));
  };
};

const onErrorIssue = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchDaIssueListFailure(json));
    });
  };
};

const daListSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchDeliveryAgentListSuccess(data));
    console.log("dalistSuccess", data);
  };
};

const daListError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchDeliveryAgentListFailed(json));
    });
  };
};

const unassignDaSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchUnassignDASuccess(data));
  };
};

const unassignDaError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchUnassignDAFailed(json));
    });
  };
};

const reserveOrderSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchReserveDASuccess(data));
  };
};

const reserveOrderError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchReserveDAFailed(json));
    });
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

export {
  fetchDeliveryAgentNotes,
  fetchDAList,
  unassignDeliveryAgent,
  reserveDeliveryAgent,
  fetchDaIssueList,
};
