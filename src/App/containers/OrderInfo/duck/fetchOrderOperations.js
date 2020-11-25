import {
  fetchOrderInfoProgress,
  fetchOrderInfoFailure,
  fetchOrderInfoSuccess,
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
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOrderInfoSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderInfoFailure(err));
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

const onSuccessNotes = (dispatch) => {
  return (data) => {
    dispatch(createNotesSuccess(data));
  };
};

const onErrorNotes = (dispatch) => {
  return (error) => {
    dispatch(createNotesFailure(error));
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

export { fetchOrder, createNotes, connectCall, fetchIssueTypes, submitIssue };
