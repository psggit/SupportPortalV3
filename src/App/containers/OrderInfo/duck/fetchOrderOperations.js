import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
  fetchCancelReasonProgress,
  fetchCancelReasonFailure,
  fetchCancelReasonSuccess,
  createNotesProgress,
  createNotesFailure,
  createNotesSuccess,
  connectCallProgress,
  connectCallFailed,
  connectCallSuccess,
  fetchIssueTypesProgress,
  fetchIssueTypesFailed,
  fetchIssueTypesSuccess,
  submitIssueProgress,
  submitIssueFailed,
  submitIssueSuccess,
} from "./actions";

import { selectOrder } from "../../Dashboard/duck";
import {
  orderInfoAPI,
  cancelReasonAPI,
  createNotesAPI,
  callAPI,
  listIssueAPI,
  submitNewIssueAPI,
} from "../../../utils";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const processResponseCall = () => {
  return (res) => {
    if (res.status === 204) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOrderInfoSuccess(data));
  };
};

const onSuccessCancel = (dispatch) => {
  return (data) => {
    dispatch(fetchCancelReasonSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderInfoFailure(err));
  };
};

const onErrorCancel = (dispatch) => {
  return (err) => {
    dispatch(fetchCancelReasonFailure(err));
  };
};

const fetchOrder = (payload) => {
  return (dispatch) => {
    dispatch(fetchOrderInfoProgress());
    dispatch(selectOrder(payload));
    orderInfoAPI(
      payload,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const fetchCancelReason = (payload) => {
  return (dispatch) => {
    dispatch(fetchCancelReasonProgress());
    cancelReasonAPI(
      payload,
      processResponse(dispatch),
      onSuccessCancel(dispatch),
      onErrorCancel(dispatch)
    );
  };
};

const onSuccessNotes = (dispatch) => {
  return (data) => {
    dispatch(createNotesSuccess(data));
  };
};

const onErrorNotes = (dispatch) => {
  // return (err) => {
  //   dispatch(createNotesFailure(err));
  // };
  return (data) => {
    data.json().then((json) => {
      dispatch(createNotesFailure(json));
    });
  };
};

const createNotes = (payload) => {
  return (dispatch) => {
    dispatch(createNotesProgress());
    createNotesAPI(
      payload,
      processResponse(dispatch),
      onSuccessNotes(dispatch),
      onErrorNotes(dispatch)
    );
  };
};

const onSuccessCall = (dispatch) => {
  return (data) => {
    // console.log("[onSuccessCall]");
    dispatch(connectCallSuccess(data));
  };
};

const onErrorCall = (dispatch) => {
  return (err) => {
    // console.log("[onErrorCall]", err);
    dispatch(connectCallFailed(err));
  };
};

const connectCall = (reqBody) => {
  return (dispatch) => {
    dispatch(connectCallProgress());
    callAPI(reqBody, processResponseCall, onSuccessCall, onErrorCall);
  };
};

const onSuccessIssueTypes = (dispatch) => {
  return (data) => {
    // console.log("onSuccessIssueTypes", data);
    dispatch(fetchIssueTypesSuccess(data));
  };
};

const onErrorIssueTypes = (dispatch) => {
  return (err) => {
    dispatch(fetchIssueTypesFailed(err));
  };
};

const fetchIssueTypes = () => {
  return (dispatch) => {
    dispatch(fetchIssueTypesProgress());
    listIssueAPI(
      null,
      processResponse(dispatch),
      onSuccessIssueTypes(dispatch),
      onErrorIssueTypes(dispatch)
    );
  };
};

const onSuccessSubmitIssue = (dispatch) => {
  return (data) => {
    // console.log("onSuccessIssueTypes", data);
    dispatch(submitIssueSuccess(data));
  };
};

const onErrorSubmitIssue = (dispatch) => {
  return (err) => {
    dispatch(submitIssueFailed(err));
  };
};

const submitIssue = (payload) => {
  return (dispatch) => {
    dispatch(submitIssueProgress());
    submitNewIssueAPI(
      payload,
      processResponse(dispatch),
      onSuccessSubmitIssue(dispatch),
      onErrorSubmitIssue(dispatch)
    );
  };
};

export {
  fetchOrder,
  fetchCancelReason,
  createNotes,
  connectCall,
  fetchIssueTypes,
  submitIssue,
};
