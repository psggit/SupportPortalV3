import { connect } from "react-redux";
import { DaNotes } from "./DaNotesComponent";
import { fetchDeliveryAgentNotes } from "../OrderInfo/DeliveryAgent/duck/operations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    deliveryAgentNotes: state.order.deliveryAgent.deliveryAgentNotesData,
    daList: state.order.deliveryAgent.deliveryAgentList,
    fetchSuccess: state.order.deliveryAgent.fetchSuccess,
    fetchProgress: state.order.deliveryAgent.fetchProgress,
    fetchFailed: state.order.deliveryAgent.fetchFailed,
    errorMsg: state.order.deliveryAgent.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeliveryAgentNotes: (payload) =>
      dispatch(fetchDeliveryAgentNotes(payload)),
  };
};

const DaNotesContainer = connect(mapStateToProps, mapDispatchToProps)(DaNotes);

export { DaNotesContainer };
