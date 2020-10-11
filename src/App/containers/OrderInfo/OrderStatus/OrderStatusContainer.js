import { connect } from "react-redux";
import { OrderStatus } from "./OrderStatusComponent";
import { propTypes } from "react-bootstrap/esm/Image";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails.timing_details,
    //fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const OrderStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderStatus);

export { OrderStatusContainer };
