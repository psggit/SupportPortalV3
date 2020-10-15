import { connect } from "react-redux";
import { RetailerComponent } from "./RetailerComponent";
import { fetchRetailerNotes } from "./duck/RetailerOperations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    retailerNotes: state.order.retailer.retailerNotesData,
    fetchSuccess: state.order.retailer.fetchSuccess,
    fetchProgress: state.order.retailer.fetchProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (orderId) => dispatch(fetchRetailerNotes(orderId)),
  };
};

const RetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerComponent);

export { RetailerContainer };
