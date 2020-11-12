import {
  fetchIssuesSuccess,
  fetchIssuesFailed,
  fetchIssuesInProgress,
  assignIssueInProgress,
  assignIssueSuccess,
  assignIssueFailed,
  resolveIssueInProgress,
  resolveIssueSuccess,
  resolveIssueFailed,
  fetchSupportPersonListInProgress,
  fetchSupportPersonListSuccess,
  fetchSupportPersonListFailed,
} from "./action";
// import { createSession } from "../../../utils";
import { fetchIssuesAPI } from "../../../utils/fetchIssuesAPI";
import { assignIssueAPI } from "../../../utils/assignIssueAPI";
import { resolveIssueAPI } from "../../../utils/resolveIssueAPI";
import { supportPersonListAPI } from "./../../../utils/supportPersonListAPI";

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
    dispatch(fetchIssuesSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchIssuesFailed(err));
  };
};

const fetchIssues = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchIssuesInProgress());
    fetchIssuesAPI(
      reqBody,
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
    dispatch(assignIssueFailed(err));
  };
};

const assignOrderIssue = (payload) => {
  return (dispatch) => {
    dispatch(assignIssueInProgress());
    assignIssueAPI(
      payload,
      processResponse(dispatch),
      onAssignIssueSuccess(dispatch),
      onAssignIssueError(dispatch)
    );
  };
};

const onResolveIssueSuccess = (dispatch) => {
  return (data) => {
    //console.log("[onSuccess] data", data);
    dispatch(resolveIssueSuccess(data));
    // createSession(data);
  };
};

const onResolveIssueError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(resolveIssueFailed(err));
  };
};

const resolveOrderIssue = (payload) => {
  return (dispatch) => {
    dispatch(resolveIssueInProgress());
    resolveIssueAPI(
      payload,
      processResponse(dispatch),
      onResolveIssueSuccess(dispatch),
      onResolveIssueError(dispatch)
    );
  };
};

const onFetchSupportListSuccess = (dispatch) => {
  return (data) => {
    //console.log("[onSuccess] data", data);
    dispatch(fetchSupportPersonListSuccess(data));
    // createSession(data);
  };
};

const onFetchSupportListError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchSupportPersonListFailed(err));
  };
};

const fetchSupportPersonList = () => {
  return (dispatch) => {
    dispatch(fetchSupportPersonListInProgress());
    supportPersonListAPI(
      processResponse(dispatch),
      onFetchSupportListSuccess(dispatch),
      onFetchSupportListError(dispatch)
    );
  };
};

export {
  fetchIssues,
  assignOrderIssue,
  resolveOrderIssue,
  fetchSupportPersonList,
};
