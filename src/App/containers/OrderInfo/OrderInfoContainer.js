import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";

import {
  fetchOrder,
  fetchCancelReason,
  fetchActivityLogs,
  createNotes,
  connectCall,
} from "../OrderInfo/duck";

const mapStateToProps = (state) => {
  // console.log("mapStateToProps", state);
  return {
    orderId: state.home.orderId,
    order: state.order.orderInfo.orderDetails,
    retailerDetails: state.order.retailerDetails,
    customerId: state.order.orderInfo.customerId,
    customerContactNumber: state.order.orderInfo.customerContactNumber,
    fetchOrderInfoSuccess: state.order.orderInfo.fetchOrderInfoSuccess,
    fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress,
    cancelReasons: state.order.orderInfo.cancelReasons,
    fetchCancelReasonSuccess: state.order.orderInfo.fetchCancelReasonSuccess,
    customerDetails: state.order.customerDetails,
    from: state.login.authData.mobile,
    successMsg: state.order.orderInfo.successMsg,
    connectCallSuccess: state.order.orderInfo.connectCallSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
    fetchCancelReason: (orderId) => dispatch(fetchCancelReason(orderId)),
    fetchActivityLogs: (payload) => dispatch(fetchActivityLogs(payload)),
    createNotes: (type) => dispatch(createNotes(type)),
    connectCall: (payload) => dispatch(connectCall(payload)),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
