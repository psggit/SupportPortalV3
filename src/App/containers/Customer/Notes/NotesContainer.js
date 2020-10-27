import { connect } from "react-redux";
import { Notes } from "./NotesComponent";
import { fetchConsumerNotes } from "../../OrderInfo/CustomerDetails/duck/CustomerOperations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    customerId: state.order.orderInfo.customerId,
    notesSuccess: state.order.customer.notesSuccess,
    notesProgress: state.order.customer.notesProgress,
    notesFail: state.order.customer.notesFail,
    errorMsg: state.order.customer.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConsumerNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
  };
};

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes);

export { NotesContainer };
