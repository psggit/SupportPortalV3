import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import { fetchOrder, fetchCancelReason } from "../OrderInfo/duck";
// import { RetailerComponent } from "../RetailerDetails/RetailerComponent";

const mapStateToProps = (state) => {
  console.log("orderinfocontainer", state);
  return {
    orderId: state.home.orderId,
    order: state.order.orderInfo.orderDetails,
    retailerDetails: state.order.retailerDetails,
    fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress,
    cancelReasons: state.order.orderInfo.cancelReasons,
    fetchOrderInfoSuccess: state.order.orderInfo.fetchOrderInfoSuccess,
    fetchCancelReasonSuccess: state.order.orderInfo.fetchCancelReasonSuccess,
    customerDetails: state.order.customerDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
    fetchCancelReason: (orderId) => dispatch(fetchCancelReason(orderId)),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
