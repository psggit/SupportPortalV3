import { connect } from "react-redux";
import { ChangeRetailerComponent } from "./ChangeRetailerComponent";
import { listRetailer } from "./duck/operations";
import { resetOnUnmount } from "./duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderDetails: state.order.orderInfo.orderInfo,
    listRetailerSuccess: state.listRetailer.listRetailerSuccess,
    listRetailerFailed: state.listRetailer.listRetailerFailed,
    listRetailerProgress: state.listRetailer.listRetailerProgress,
    errorMsg: state.listRetailer.errorMsg,
    listRetailerData: state.listRetailer.listRetailerData,
    orderInfo: state.order.orderInfo.orderInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listRetailer: (payload) => dispatch(listRetailer(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const ChangeRetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeRetailerComponent);

export { ChangeRetailerContainer };
