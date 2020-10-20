import { connect } from "react-redux";
import { IssuesComponent } from "./IssuesComponent";
import { fetchIssues, assignOrderIssue, resolveOrderIssue } from "./duck/operations";

const mapStateToProps = (state) => {
  console.log("state", state.issues)
  return {
    issueList: state.issues.issueList,
    fetchIssuesSuccess: state.issues.fetchIssuesSuccess,
    fetchIssuesInProgress: state.issues.fetchIssuesInProgress,
    assignIssueInProgress: state.issues.assignIssueInProgress,
    assignIssueSuccess: state.issues.assignIssueSuccess,
    resolveIssueInProgress: state.issues.resolveIssueInProgress,
    resolveIssueSuccess: state.issues.resolveIssueInProgress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssueList: () => dispatch(fetchIssues()),
    assignIssue: (orderId) => dispatch(assignOrderIssue(orderId)),
    resolveIssue: (orderId) => dispatch(resolveOrderIssue(orderId)),
  }
}

const IssuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesComponent);

export { IssuesContainer };
