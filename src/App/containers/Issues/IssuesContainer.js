import { connect } from "react-redux";
import { IssuesComponent } from "./IssuesComponent";
import {
  fetchIssues,
  assignOrderIssue,
  resolveOrderIssue,
  fetchSupportPersonList,
} from "./duck/operations";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  return {
    issueList: state.issues.issueList,
    supportPersonList: state.issues.supportPersonList,
    fetchSupportPersonListInProgress:
      state.issues.fetchSupportPersonListInProgress,
    fetchSupportPersonListSuccess: state.issues.fetchSupportPersonListSuccess,
    fetchSupportPersonListFailed: state.issues.fetchSupportPersonListFailed,
    fetchIssuesSuccess: state.issues.fetchIssuesSuccess,
    fetchIssuesFailed: state.issues.fetchIssuesFailed,
    fetchIssuesInProgress: state.issues.fetchIssuesInProgress,
    assignIssueInProgress: state.issues.assignIssueInProgress,
    assignIssueSuccess: state.issues.assignIssueSuccess,
    resolveIssueInProgress: state.issues.resolveIssueInProgress,
    resolveIssueSuccess: state.issues.resolveIssueSuccess,
    errorMsgSupportList: state.issues.errorMsgSupportList,
    errorMsg: state.issues.errorMsg,
    assignIssueFailed: state.issues.assignIssueFailed,
    errorMsgAssign: state.issues.errorMsgAssign,
    errorMsgResolve: state.issues.errorMsgResolve,
    resolveIssueFailed: state.issues.resolveIssueFailed,
    successMsg: state.issues.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssueList: (payload) => dispatch(fetchIssues(payload)),
    assignIssue: (orderId) => dispatch(assignOrderIssue(orderId)),
    resolveIssue: (orderId) => dispatch(resolveOrderIssue(orderId)),
    fetchSupportPerson: () => dispatch(fetchSupportPersonList()),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const IssuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesComponent);

export { IssuesContainer };
