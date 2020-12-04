import { connect } from "react-redux";
import { Notes } from "./NotesComponent";
import { fetchConsumerNotes } from "../../OrderInfo/CustomerDetails/duck/CustomerOperations";
import { fetchConsumerNotesList } from "../../OrderInfo/CustomerDetails/duck/CustomerOperations";
import { createNotes } from "../../OrderInfo/duck";
import { resetOnUnmount } from "../../OrderInfo/CustomerDetails/duck";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    customerId: state.order.orderInfo.customerId,
    notesSuccess: state.order.customer.fetchCustomerNotesSuccess,
    notesProgress: state.order.customer.fetchCustomerNotesProgress,
    notesFail: state.order.customer.fetchCustomerNotesFailed,
    errorMsg: state.order.customer.errorMessageCustomerNotes,
    createNotesSuccess: state.order.orderInfo.createNotesSuccess,
    successMsg: state.order.orderInfo.successMsg,
    NoteListSuccess: state.order.customer.NoteListSuccess,
    NoteListFailed: state.order.customer.NoteListFailed,
    NoteListProgress: state.order.customer.NoteListProgress,
    noteListData: state.order.customer.noteListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConsumerNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
    fetchConsumerNotesList: () => dispatch(fetchConsumerNotesList()),
    createNotes: (type) => dispatch(createNotes(type)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes);

export { NotesContainer };
