import { connect } from "react-redux";
import { RetailerDetails } from "./RetailerComponent";
import {
  fetchRetailerNotes,
  fetchRetailerIssueList,
} from "./duck/RetailerOperations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    retailerNotes: state.order.retailer.retailerNotesData,
    fetchSuccess: state.order.retailer.fetchSuccess,
    fetchProgress: state.order.retailer.fetchProgress,
    fetchRetailerIssueListSuccess:
      state.order.retailer.fetchRetailerIssueListSuccess,
    fetchRetailerIssueListFailure:
      state.order.retailer.fetchRetailerIssueListFailure,
    fetchRetailerIssueListProgress:
      state.order.retailer.fetchRetailerIssueListProgress,
    retailerIssueList: state.order.retailer.retailerIssueList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (orderId) => dispatch(fetchRetailerNotes(orderId)),
    fetchRetailerIssueList: () => dispatch(fetchRetailerIssueList()),
  };
};

const RetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerDetails);

export { RetailerContainer };
