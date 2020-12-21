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
  };
};

const ModificationListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModificationListComponent);

export { ModificationListContainer };
