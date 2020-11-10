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
    fetchIssuesSuccess: state.issues.fetchIssuesSuccess,
    fetchIssuesInProgress: state.issues.fetchIssuesInProgress,
    assignIssueInProgress: state.issues.assignIssueInProgress,
    assignIssueSuccess: state.issues.assignIssueSuccess,
    resolveIssueInProgress: state.issues.resolveIssueInProgress,
    resolveIssueSuccess: state.issues.resolveIssueInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssueList: () => dispatch(fetchIssues()),
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
