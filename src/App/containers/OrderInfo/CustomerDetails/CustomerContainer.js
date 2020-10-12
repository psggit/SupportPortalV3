import { connect } from "react-redux";
import { CustomerDetails } from "./CustomerComponent";
import { fetchConsumerNotes } from "./duck/CustomerOperations";

const mapStateToProps = (state) => {
  //console.log("mapStateToProps", state.order.orderInfo.orderInfo);
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    notesSuccess: state.order.customer.notesSuccess,
    notesProgress: state.order.customer.notesProgress,
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
