import { connect } from "react-redux";
import { RetailerCardComponent } from "./RetailerCardComponent";
import { resetOnUnmount } from "./duck/action";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    listRetailerData: state.listRetailer.listRetailerData,
    listRetailerSuccess: state.listRetailer.listRetailerSuccess,
    reassignRetailerData: state.listRetailer.reassignRetailerData,
    errorMessage: state.listRetailer.errorMessage,
    successMsg: state.listRetailer.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const RetailerCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerCardComponent);

export { RetailerCardContainer };
