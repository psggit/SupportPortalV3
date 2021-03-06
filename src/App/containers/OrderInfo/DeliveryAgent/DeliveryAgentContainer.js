import { connect } from "react-redux";
import { DeliveryAgentComponent } from "./DeliveryAgentComponent";
import {
  fetchDeliveryAgentNotes,
  fetchDAList,
  unassignDeliveryAgent,
  reserveDeliveryAgent,
  fetchDaIssueList,
  unreserveDeliveryAgent,
} from "./duck/operations";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  // console.log("[DaList]", state.order.deliveryAgent.deliveryAgentList);
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    deliveryAgentNotes: state.order.deliveryAgent.deliveryAgentNotesData,
    daList: state.order.deliveryAgent.deliveryAgentList,
    fetchSuccess: state.order.deliveryAgent.fetchSuccess,
    fetchProgress: state.order.deliveryAgent.fetchProgress,
    daListSuccess: state.order.deliveryAgent.daListSuccess,
    daListProgress: state.order.deliveryAgent.daListProgress,
    daListFail: state.order.deliveryAgent.daListFail,
    unassignDASuccess: state.order.deliveryAgent.unassignDASuccess,
    unassignDAFail: state.order.deliveryAgent.unassignDAFail,
    successMsg: state.order.deliveryAgent.successMsg,
    errorMsg: state.order.deliveryAgent.errorMsg,
    errorMessageUnassign: state.order.deliveryAgent.errorMessageUnassign,
    errorMessageReserve: state.order.deliveryAgent.errorMessageReserve,
    message: state.order.deliveryAgent.message,
    reserveDaSuccess: state.order.deliveryAgent.reserveDaSuccess,
    reserveDaFail: state.order.deliveryAgent.reserveDaFail,
    orderId: state.home.orderId,
    customerId: state.order.orderInfo.customerId,
    fetchDaIssueListProgress:
      state.order.deliveryAgent.fetchDaIssueListProgress,
    fetchDaIssueListSuccess: state.order.deliveryAgent.fetchDaIssueListSuccess,
    fetchDaIssueListFailure: state.order.deliveryAgent.fetchDaIssueListFailure,
    daIssueList: state.order.deliveryAgent.daIssueList,
    fetchUnreserveDASuccess: state.order.deliveryAgent.fetchUnreserveDASuccess,
    fetchUnreserveDAFailed: state.order.deliveryAgent.fetchUnreserveDAFailed,
    fetchUnreserveDAProgress:
      state.order.deliveryAgent.fetchUnreserveDAProgress,
    errorMessageUnreserve: state.order.deliveryAgent.errorMessageUnreserve,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (orderId) => dispatch(fetchDeliveryAgentNotes(orderId)),
    unassignDeliveryAgent: (orderId) =>
      dispatch(unassignDeliveryAgent(orderId)),
    fetchDAList: (orderId, retailerId) =>
      dispatch(fetchDAList(orderId, retailerId)),
    reserveDeliveryAgent: (payload) => dispatch(reserveDeliveryAgent(payload)),
    unreserveDeliveryAgent: (payload) =>
      dispatch(unreserveDeliveryAgent(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
    fetchDaIssueList: () => dispatch(fetchDaIssueList()),
  };
};

const DeliveryAgentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAgentComponent);

export { DeliveryAgentContainer };
