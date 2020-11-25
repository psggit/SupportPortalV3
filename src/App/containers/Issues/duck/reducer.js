import { createReducer } from "@reduxjs/toolkit";
import {
  fetchIssuesInProgress,
  fetchIssuesFailed,
  fetchIssuesSuccess,
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
import { setErrorMessage } from "../../../utils/errorMessages";

const initialState = {
  fetchIssuesInProgress: false,
  fetchIssuesFailed: false,
  fetchIssuesSuccess: false,
  assignIssueInProgress: false,
  assignIssueSuccess: false,
  assignIssueFailed: false,
  resolveIssueInProgress: false,
  resolveIssueSuccess: false,
  resolveIssueFailed: false,
  fetchSupportPersonListInProgress: false,
  fetchSupportPersonListSuccess: false,
  fetchSupportPersonListFailed: false,
  issueList: null,
  supportPersonList: null,
  errorMsg: "",
  errorMsgAssign: "",
  errorMsgResolve: "",
  errorMsgSupportList: "",
};

const issuesReducer = createReducer(initialState, {
  [fetchIssuesInProgress]: (state) => ({
    ...state,
    fetchIssuesInProgress: true,
    fetchIssuesFailed: false,
    fetchIssuesSuccess: false,
  }),
  [fetchIssuesFailed]: (state, error) => ({
    ...state,
    fetchIssuesInProgress: false,
    fetchIssuesFailed: true,
    fetchIssuesSuccess: false,
    errorMsg: setErrorMessage(error),
  }),
  [fetchIssuesSuccess]: (state, data) => {
    return {
      ...state,
      fetchIssuesInProgress: false,
      fetchIssuesFailed: false,
      fetchIssuesSuccess: true,
      issueList: data.payload,
    };
  },
  [assignIssueInProgress]: (state) => {
    return {
      ...state,
      assignIssueInProgress: true,
      assignIssueFailed: false,
      assignIssueSuccess: false,
    };
  },
  [assignIssueSuccess]: (state) => {
    return {
      ...state,
      assignIssueInProgress: false,
      assignIssueFailed: false,
      assignIssueSuccess: true,
    };
  },
  [assignIssueFailed]: (state, data) => {
    return {
      ...state,
      assignIssueInProgress: false,
      assignIssueFailed: true,
      assignIssueSuccess: false,
      errorMsgAssign: setErrorMessage(data),
    };
  },
  [resolveIssueInProgress]: (state) => {
    return {
      ...state,
      resolveIssueInProgress: true,
      resolveIssueFailed: false,
      resolveIssueSuccess: false,
    };
  },
  [resolveIssueSuccess]: (state) => {
    return {
      ...state,
      resolveIssueInProgress: false,
      resolveIssueFailed: false,
      resolveIssueSuccess: true,
    };
  },
  [resolveIssueFailed]: (state, error) => {
    return {
      ...state,
      resolveIssueInProgress: false,
      resolveIssueFailed: true,
      resolveIssueSuccess: false,
      errorMsgResolve: setErrorMessage(error),
    };
  },
  [fetchSupportPersonListInProgress]: (state) => {
    return {
      ...state,
      fetchSupportPersonListInProgress: true,
      fetchSupportPersonListFailed: false,
      fetchSupportPersonListSuccess: false,
    };
  },
  [fetchSupportPersonListSuccess]: (state, data) => {
    return {
      ...state,
      fetchSupportPersonListInProgress: false,
      fetchSupportPersonListFailed: false,
      fetchSupportPersonListSuccess: true,
      supportPersonList: data.payload,
    };
  },
  [fetchSupportPersonListFailed]: (state, data) => {
    return {
      ...state,
      fetchSupportPersonListInProgress: false,
      fetchSupportPersonListFailed: true,
      fetchSupportPersonListSuccess: false,
      errorMsgSupportList: setErrorMessage(data),
    };
  },
});

export { issuesReducer };
