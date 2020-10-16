import { connect } from "react-redux";
import { DeliveryAgentComponent } from "./DeliveryAgentComponent";
import { fetchDeliveryAgentNotes } from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    deliveryAgentNotes: state.order.deliveryAgent.deliveryAgentNotesData,
    fetchSuccess: state.order.deliveryAgent.fetchSuccess,
    fetchProgress: state.order.deliveryAgent.fetchProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (orderId) => dispatch(fetchDeliveryAgentNotes(orderId)),
  };
};

const DeliveryAgentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAgentComponent);

export { DeliveryAgentContainer };
