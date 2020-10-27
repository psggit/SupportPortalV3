import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderInProgress,
  sendSMSInProgress,
  sendSMSSuccess,
  sendSMSFailed,
  // resolveOrderInProgress,
  // resolveOrderSuccess,
  // resolveOrderFailed,
  // fetchSupportPersonListInProgress,
  // fetchSupportPersonListSuccess,
  // fetchSupportPersonListFailed,
} from "./action";

import { listOrderModificationAPI, sendSMSAPI } from "../../../utils";

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

/*
const onSuccess = (dispatch) => {
  return (data) => {
    // console.log("[onSuccess] data", data);
    dispatch(fetchIssuesSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchIssuesFailed(err));
  };
};

const fetchIssues = () => {
  return (dispatch) => {
    dispatch(fetchIssuesInProgress());
    fetchIssuesAPI(
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const onAssignIssueSuccess = (dispatch) => {
  return (data) => {
    // console.log("[onSuccess] data", data);
    dispatch(assignIssueSuccess(data));
    // createSession(data);
  };
};

const onAssignIssueError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(assignIssueFailed(err));
  };
};

const sendSMSIssue = (payload) => {
  return (dispatch) => {
    dispatch(assignIssueInProgress());
    assignIssueAPI(
      payload,
      processResponse(dispatch),
      onAssignIssueSuccess(dispatch),
      onAssignIssueError(dispatch)
    );
  };
};*/

const onsendSMSSuccess = (dispatch) => {
  return (data) => {
    //console.log("[onSuccess] data", data);
    dispatch(sendSMSSuccess(data));
    // createSession(data);
  };
};

const onsendSMSError = (dispatch) => {
  return (err) => {
    // console.log("[onError]", err);
    dispatch(sendSMSFailed(err));
  };
};

const processResponseSMS = () => {
  // console.log("[processResponse]");
  return (res) => {
    return res.json();
    // if (res.ok) {
    //   return res.json();
    // }
    // if (res.status === 400) {
    //   throw new Error("invalid params");
    // } else {
    //   throw new Error("Something went wrong, try again");
    // }
  };
};

const sendSMSOperation = (payload) => {
  return (dispatch) => {
    dispatch(sendSMSInProgress());
    sendSMSAPI(
      payload,
      processResponseSMS(dispatch),
      onsendSMSSuccess(dispatch),
      onsendSMSError(dispatch)
    );
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    //console.log("[onSuccess] data", data);
    dispatch(fetchOrderSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchOrderFailed(err));
  };
};

const fetchListOrderModification = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderInProgress());
    listOrderModificationAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchListOrderModification, sendSMSOperation };
