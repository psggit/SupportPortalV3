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
    orderList: state.order.orderModify.orderList,
    fetchModificationSuccess: state.order.orderModify.fetchModificationSuccess,
    fetchOrderFailed: state.order.orderModify.fetchOrderFailed,
    fetchOrderInProgress: state.order.orderModify.fetchOrderInProgress,
    sendSMSInProgress: state.order.orderModify.sendSMSInProgress,
    sendSMSSuccess: state.order.orderModify.sendSMSSuccess,
    sendSMSFailed: state.order.orderModify.sendSMSFailed,
    fetchCancelCartSuccess: state.order.orderModify.fetchCancelCartSuccess,
    fetchUpdatedStatusSuccess:
      state.order.orderModify.fetchUpdatedStatusSuccess,
    fetchUpdatedStatusFailed: state.order.orderModify.fetchUpdatedStatusFailed,
    msg: state.order.orderModify.msg,
    updatedStatusMsg: state.order.orderModify.updatedStatusMsg,
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
