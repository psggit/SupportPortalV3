import { connect } from "react-redux";
import { OrderModificationComponent } from "./OrderModificationComponent";
import {
  fetchListOrderModification,
  sendSMSOperation,
  cancelOrderRequest,
} from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    orderList: state.orderModify.orderList,
    fetchOrderSuccess: state.orderModify.fetchOrderSuccess,
    fetchOrderFailed: state.orderModify.fetchOrderFailed,
    fetchOrderInProgress: state.orderModify.fetchOrderInProgress,
    sendSMSInProgress: state.orderModify.sendSMSInProgress,
    sendSMSSuccess: state.orderModify.sendSMSSuccess,
    sendSMSFailed: state.orderModify.sendSMSFailed,
    msg: state.orderModify.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListOrderModification: (payload) => dispatch(fetchListOrderModification(payload)),
    sendSMSOperation: (orderId) => dispatch(sendSMSOperation(orderId)),
    cancelOrderRequest: (orderId) => dispatch(cancelOrderRequest(orderId)),
  };
};

const OrderModificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderModificationComponent);

export { OrderModificationContainer };
