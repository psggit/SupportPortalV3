import { connect } from "react-redux";
import { IssuesComponent } from "./IssuesComponent";
import {
  fetchIssues,
  assignOrderIssue,
  resolveOrderIssue,
  fetchSupportPersonList,
} from "./duck/operations";

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
    resolveIssueSuccess: state.issues.resolveIssueInProgress,
    errorMsgSupportList: state.issues.errorMsgSupportList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssueList: (payload) => dispatch(fetchIssues(payload)),
    assignIssue: (orderId) => dispatch(assignOrderIssue(orderId)),
    resolveIssue: (orderId) => dispatch(resolveOrderIssue(orderId)),
    fetchSupportPerson: () => dispatch(fetchSupportPersonList()),
  };
};

const IssuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesComponent);

export { IssuesContainer };
