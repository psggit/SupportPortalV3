import { connect } from "react-redux";
import { ConsumerComponent } from "./CustomerComponent";
import { fetchConsumerNotes } from "./duck/CustomerOperations";

const mapStateToProps = (state) => {
  // console.log("mapStateToProps", state.order.orderInfo.orderInfo);
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    fetchSuccess: state.order.customer.notesSuccess,
    fetchProgress: state.order.customer.notesProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
  };
};

const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumerComponent);

export { CustomerContainer };
