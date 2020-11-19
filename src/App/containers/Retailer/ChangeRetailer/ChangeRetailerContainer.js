import { connect } from "react-redux";
import { ChangeRetailerComponent } from "./ChangeRetailerComponent";
import { listRetailer, reassignRetailer } from "./duck/operations";
import { resetOnUnmount } from "./duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderDetails: state.order.orderInfo.orderInfo,
    listRetailerSuccess: state.listRetailer.listRetailerSuccess,
    listRetailerFailed: state.listRetailer.listRetailerFailed,
    listRetailerProgress: state.listRetailer.listRetailerProgress,
    reassignRetailerProgress: state.listRetailer.reassignRetailerProgress,
    reassignRetailerFailed: state.listRetailer.reassignRetailerFailed,
    reassignRetailerSuccess: state.listRetailer.reassignRetailerSuccess,
    errorMsg: state.listRetailer.errorMsg,
    successMsg: state.listRetailer.successMsg,
    errorMessage: state.listRetailer.errorMessage,
    listRetailerData: state.listRetailer.listRetailerData,
    orderInfo: state.order.orderInfo.orderInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listRetailer: (payload) => dispatch(listRetailer(payload)),
    reassignRetailer: (payload) => dispatch(reassignRetailer(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const ChangeRetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeRetailerComponent);

export { ChangeRetailerContainer };
