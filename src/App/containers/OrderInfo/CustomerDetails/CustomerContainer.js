import { connect } from "react-redux";
import { CustomerDetails } from "./CustomerComponent";
import {
  fetchConsumerNotes,
  fetchConsumerNotesList,
} from "./duck/CustomerOperations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    fetchSuccess: state.order.customer.notesSuccess,
    fetchProgress: state.order.customer.notesProgress,
    noteListData: state.order.customer.noteListData,
    orderId: state.home.orderId,
    customerId: state.order.orderInfo.customerId,
    consumerNoteListSuccess: state.order.customer.consumerNoteListSuccess,
    consumerNoteListFailed: state.order.customer.consumerNoteListFailed,
    consumerNoteListProgress: state.order.customer.consumerNoteListProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConsumerNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
    fetchConsumerNotesList: () => dispatch(fetchConsumerNotesList()),
  };
};

const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetails);

export { CustomerContainer };
