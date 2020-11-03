import { connect } from "react-redux";
import { DaNotes } from "./DaNotesComponent";
import { fetchDeliveryAgentNotes } from "../OrderInfo/DeliveryAgent/duck/operations";
import { createNotes } from "../OrderInfo/duck";
import { resetOnUnmount } from "../OrderInfo/DeliveryAgent/duck";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    deliveryAgentNotes: state.order.deliveryAgent.deliveryAgentNotesData,
    daList: state.order.deliveryAgent.deliveryAgentList,
    fetchSuccess: state.order.deliveryAgent.fetchSuccess,
    fetchProgress: state.order.deliveryAgent.fetchProgress,
    fetchFailed: state.order.deliveryAgent.fetchFailed,
    errorMsg: state.order.deliveryAgent.errorMsg,
    createNotesSuccess: state.order.orderInfo.createNotesSuccess,
    successMsg: state.order.orderInfo.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeliveryAgentNotes: (payload) =>
      dispatch(fetchDeliveryAgentNotes(payload)),
    createNotes: (type) => dispatch(createNotes(type)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const DaNotesContainer = connect(mapStateToProps, mapDispatchToProps)(DaNotes);

export { DaNotesContainer };
