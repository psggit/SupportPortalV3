import { connect } from "react-redux";
import { DeliveryAgentComponent } from "./DeliveryAgentComponent";
import {
  fetchDeliveryAgentNotes,
  fetchDAList,
  unassignDeliveryAgent,
  reserveDeliveryAgent,
} from "./duck/operations";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  console.log("[DaList]", state.order.deliveryAgent.deliveryAgentList);
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
    message: state.order.deliveryAgent.message,
    reserveDaSuccess: state.order.deliveryAgent.reserveDaSuccess,
    reserveDaFail: state.order.deliveryAgent.reserveDaFail,
    orderId: state.home.orderId,
    customerId: state.order.orderInfo.customerId,
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
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const DeliveryAgentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAgentComponent);

export { DeliveryAgentContainer };
