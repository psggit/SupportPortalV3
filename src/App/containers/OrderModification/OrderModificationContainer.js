import { connect } from "react-redux";
import { OrderModificationComponent } from "./OrderModificationComponent";
import {
  fetchListOrderModification,
  sendSMSOperation,
  // resolveOrderIssue,
  // fetchSupportPersonList,
} from "./duck/operations";

// fetchOrderSuccess,
//   fetchOrderFailed,
//   fetchOrderInProgress,
//   assignOrderInProgress,
//   assignOrderSuccess,
//   assignOrderFailed,
//   resolveOrderInProgress,
//   resolveOrderSuccess,
//   resolveOrderFailed,
//   fetchSupportPersonListInProgress,
//   fetchSupportPersonListSuccess,
//   fetchSupportPersonListFailed,

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
    // resolveIssue: (orderId) => dispatch(resolveOrderIssue(orderId)),
    // fetchSupportPerson: () => dispatch(fetchSupportPersonList()),
  };
};

const OrderModificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderModificationComponent);

export { OrderModificationContainer };
