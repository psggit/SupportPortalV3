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
} from "./action";

const initialState = {
  fetchIssuesInProgress: true,
  fetchIssuesFailed: false,
  fetchIssuesSuccess: false,
  assignIssueInProgress: false,
  assignIssueSuccess: false,
  assignIssueFailed: false,
  resolveIssueInProgress: false,
  resolveIssueSuccess: false,
  resolveIssueFailed: false,
  issueList: null,
};

const issuesReducer = createReducer(initialState, {
  [fetchIssuesInProgress]: (state) => ({
    ...state,
    fetchIssuesInProgress: true,
    fetchIssuesFailed: false,
    fetchIssuesSuccess: false,
  }),
  [fetchIssuesFailed]: (state) => ({
    ...state,
    fetchIssuesInProgress: false,
    fetchIssuesFailed: true,
    fetchIssuesSuccess: false,
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
  [assignIssueFailed]: (state) => {
    return {
      ...state,
      assignIssueInProgress: false,
      assignIssueFailed: true,
      assignIssueSuccess: false,
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
  [resolveIssueFailed]: (state) => {
    return {
      ...state,
      resolveIssueInProgress: false,
      resolveIssueFailed: true,
      resolveIssueSuccess: false,
    };
  },
});

export { issuesReducer };
