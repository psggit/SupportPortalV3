import { connect } from "react-redux";
import { RetailerCardComponent } from "./RetailerCardComponent";
import { reassignRetailer } from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    listRetailerData: state.listRetailer.listRetailerData,
    listRetailerSuccess: state.listRetailer.listRetailerSuccess,
    reassignRetailerProgress: state.listRetailer.reassignRetailerProgress,
    reassignRetailerFailed: state.listRetailer.reassignRetailerFailed,
    reassignRetailerSuccess: state.listRetailer.reassignRetailerSuccess,
    reassignRetailerData: state.listRetailer.reassignRetailerData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reassignRetailer: (payload) => dispatch(reassignRetailer(payload)),
  };
};

const RetailerCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerCardComponent);

export { RetailerCardContainer };
