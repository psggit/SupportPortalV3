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
    fetchSuccess: state.order.customer.fetchCustomerNotesSuccess,
    fetchProgress: state.order.customer.fetchCustomerNotesProgress,
    fetchFailed: state.order.customer.fetchCustomerNotesFailed,
    noteListData: state.order.customer.noteListData,
    orderId: state.home.orderId,
    customerId: state.order.orderInfo.customerId,
    consumerNoteListSuccess: state.order.customer.consumerNoteListSuccess,
    consumerNoteListFailed: state.order.customer.consumerNoteListFailed,
    consumerNoteListProgress: state.order.customer.consumerNoteListProgress,
    errorMsg: state.order.customer.errorMsg,
    errorMessage: state.order.customer.errorMessage,
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
