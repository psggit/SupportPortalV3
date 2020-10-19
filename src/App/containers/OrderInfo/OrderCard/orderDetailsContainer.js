import { connect } from "react-redux";
import { OrderDetailsCard } from "./orderDetailsCard";
import { cancelOrder } from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    cancelOrderSuccess: state.order.orderInfo.cancelOrderSuccess,
    cancelOrderFailure: state.order.orderInfo.cancelOrderFailure,
    cancelOrderProgress: state.order.orderInfo.cancelOrderProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelOrder: (payload) => dispatch(cancelOrder(payload)),
  };
};

const orderDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsCard);

export { orderDetailsContainer };
