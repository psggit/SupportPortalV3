import { connect } from "react-redux";
import { ChangeRetailerComponent } from "./ChangeRetailerComponent";
import { listRetailer } from "./duck/operations";

const mapStateToProps = (state) => {
  console.log("orderinfocontainer", state.order.orderInfo.orderInfo);
  return {
    orderId: state.home.orderId,
    orderDetails: state.order.orderInfo.orderInfo,
    listRetailerSuccess: state.cart.listRetailerSuccess,
    listRetailerFailed: state.cart.listRetailerFailed,
    listRetailerProgress: state.cart.listRetailerProgress,
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
