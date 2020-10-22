import { connect } from "react-redux";
import { ChangeRetailerComponent } from "./ChangeRetailerComponent";
import { listRetailer } from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderDetails: state.order.orderInfo.orderInfo,
    listRetailerSuccess: state.listRetailer.listRetailerSuccess,
    listRetailerFailed: state.listRetailer.listRetailerFailed,
    listRetailerProgress: state.listRetailer.listRetailerProgress,
    listRetailerData: state.listRetailer.listRetailerData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listRetailer: (payload) => dispatch(listRetailer(payload)),
  };
};

const ChangeRetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeRetailerComponent);

export { ChangeRetailerContainer };
