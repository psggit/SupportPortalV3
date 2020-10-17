import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import {
  fetchOrder,
  fetchCancelReason,
  createNotes,
  connectCall,
} from "../OrderInfo/duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    order: state.order.orderInfo.orderDetails,
    retailerDetails: state.order.retailerDetails,
    fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress,
    fetchOrderInfoFailure: state.order.orderInfo.fetchOrderInfoFailure,
    cancelReasons: state.order.orderInfo.cancelReasons,
    fetchOrderInfoSuccess: state.order.orderInfo.fetchOrderInfoSuccess,
    fetchCancelReasonSuccess: state.order.orderInfo.fetchCancelReasonSuccess,
    fetchCancelReasonFailure: state.order.orderInfo.fetchCancelReasonFailure,
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
    createNotes: (type) => dispatch(createNotes(type)),
    connectCall: (payload) => dispatch(connectCall(payload)),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
