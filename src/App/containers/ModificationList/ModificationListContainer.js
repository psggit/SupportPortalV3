import { connect } from "react-redux";
import { ModificationListComponent } from "./ModificationListComponent";
import {
  fetchListOrderModification,
  sendSMSOperation,
  cancelOrderRequest,
  fetchUpdatedStatus,
} from "../OrderInfo/ModificationDetails/duck/operations";

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListOrderModification: (payload) =>
      dispatch(fetchListOrderModification(payload)),
    sendSMSOperation: (orderId) => dispatch(sendSMSOperation(orderId)),
    cancelOrderRequest: (orderId) => dispatch(cancelOrderRequest(orderId)),
    fetchUpdatedStatus: (payload) => dispatch(fetchUpdatedStatus(payload)),
  };
};

const ModificationListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModificationListComponent);

export { ModificationListContainer };
