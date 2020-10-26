import { connect } from "react-redux";
import { CustomerDetails } from "./CustomerComponent";
import { fetchConsumerNotes } from "./duck/CustomerOperations";

const mapStateToProps = (state) => {
  console.log("store", state);
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    fetchSuccess: state.order.customer.notesSuccess,
    fetchProgress: state.order.customer.notesProgress,
    orderId: state.home.orderId,
    customerId: state.order.orderInfo.customerId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConsumerNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
  };
};

const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetails);

export { CustomerContainer };
