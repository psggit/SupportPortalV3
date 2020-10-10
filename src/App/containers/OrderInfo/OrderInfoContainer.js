import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import { fetchOrder, fetchCancelReason } from "../OrderInfo/duck";

const mapStateToProps = (state) => {
  console.log("orderinfocontainer", state);
  return {
    orderId: state.home.orderId,
    orderInfo: state.order.orderInfo,
    retailerDetails: state.order.retailerDetails,
    fetchOrderInfoSuccess: state.order.orderInfo.fetchOrderInfoSuccess,
    fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress,
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
