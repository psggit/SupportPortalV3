import { connect } from "react-redux";
import { OrderStatus } from "./OrderStatusComponent";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    timingDetails: state.order.orderInfo.orderDetails.timing_details,
    orderId: state.order.orderInfo.orderInfo.order_id,

    //fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress
  };
};

const mapDispatchToProps = () => {
  return {};
};

const OrderStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderStatus);

export { OrderStatusContainer };
