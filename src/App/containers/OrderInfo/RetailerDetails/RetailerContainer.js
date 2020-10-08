import { connect } from "react-redux";
import { RetailerDetails } from "./RetailerComponent";
import { fetchRetailerNotes } from "./duck/RetailerOperations";

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    retailerNotes: state.order.retailer.retailerNotesData,
    fetchSuccess: state.order.retailer.fetchSuccess,
    fetchProgress: state.order.retailer.fetchProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRetailerNotes: (orderId) => dispatch(fetchRetailerNotes(orderId)),
  };
};

const RetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerDetails);

export { RetailerContainer };
