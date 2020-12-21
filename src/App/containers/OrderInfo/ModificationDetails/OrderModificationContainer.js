import { connect } from "react-redux";
import { OrderModificationComponent } from "./OrderModificationComponent";
import {
  fetchListOrderModification,
  sendSMSOperation,
  cancelOrderRequest,
  fetchUpdatedStatus,
} from "./duck/operations";
import { resetOnUnmount } from "./duck/action";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderList: state.orderModify.orderList,
    fetchOrderSuccess: state.orderModify.fetchOrderSuccess,
    fetchOrderFailed: state.orderModify.fetchOrderFailed,
    fetchOrderInProgress: state.orderModify.fetchOrderInProgress,
    sendSMSInProgress: state.orderModify.sendSMSInProgress,
    sendSMSSuccess: state.orderModify.sendSMSSuccess,
    sendSMSFailed: state.orderModify.sendSMSFailed,
    fetchCancelCartSuccess: state.orderModify.fetchCancelCartSuccess,
    fetchUpdatedStatusSuccess: state.orderModify.fetchUpdatedStatusSuccess,
    fetchUpdatedStatusFailed: state.orderModify.fetchUpdatedStatusFailed,
    msg: state.orderModify.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListOrderModification: (payload) =>
      dispatch(fetchListOrderModification(payload)),
    sendSMSOperation: (orderId) => dispatch(sendSMSOperation(orderId)),
    cancelOrderRequest: (orderId) => dispatch(cancelOrderRequest(orderId)),
    fetchUpdatedStatus: (payload) => dispatch(fetchUpdatedStatus(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const OrderModificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderModificationComponent);

export { OrderModificationContainer };
