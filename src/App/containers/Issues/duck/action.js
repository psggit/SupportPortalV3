import { createAction } from "@reduxjs/toolkit";

const fetchIssuesSuccess = createAction("fetchIssuesSuccess");
const fetchIssuesFailed = createAction("fetchIssuesFailed");
const fetchIssuesInProgress = createAction("fetchIssuesInProgress");
const assignIssueInProgress = createAction("assignIssueInProgress");
const assignIssueSuccess = createAction("assignIssueSuccess");
const assignIssueFailed = createAction("assignIssueFailed");
const resolveIssueInProgress = createAction("resolveIssueInProgress");
const resolveIssueSuccess = createAction("resolveIssueSuccess");
const resolveIssueFailed = createAction("resolveIssueFailed");

export {
  fetchIssuesSuccess,
  fetchIssuesFailed,
  fetchIssuesInProgress,
  assignIssueInProgress,
  assignIssueSuccess,
  assignIssueFailed,
  resolveIssueInProgress,
  resolveIssueSuccess,
  resolveIssueFailed
};
