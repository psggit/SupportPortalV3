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
import { resolveStockIssueAPI } from "../../../utils/resolveStockIssueAPI";
import { resolveIssueAPI } from "../../../utils/resolveIssueAPI";
import { supportPersonListAPI } from "./../../../utils/supportPersonListAPI";

const processResponse = () => {
  // console.log("[processResponse]");
  return (res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
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

const fetchIssues = (payload) => {
  return (dispatch) => {
    dispatch(fetchIssuesInProgress());
    fetchIssuesAPI(
      payload,
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
  };
};

const onResolveIssueError = (dispatch) => {
  return (err) => {
    dispatch(resolveIssueFailed(err));
  };
};

const resolveOrderIssue = (payload) => {
  return (dispatch) => {
    dispatch(resolveIssueInProgress());
    if (payload.issueType === "stock_issue") {
      resolveStockIssueAPI(
        payload,
        processResponse(dispatch),
        onResolveIssueSuccess(dispatch),
        onResolveIssueError(dispatch)
      );
    } else {
      resolveIssueAPI(
        payload,
        processResponse(dispatch),
        onResolveIssueSuccess(dispatch),
        onResolveIssueError(dispatch)
      );
    }
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
