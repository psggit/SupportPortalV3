import { connect } from "react-redux";
import { Notes } from "./NotesComponent";
import { NotesList } from "./mockData";
import { fetchConsumerNotes } from "../../OrderInfo/CustomerDetails/duck/CustomerOperations";

const mapStateToProps = (state) => {
  console.log("[notes-mapStateToProps]", state);
  console.log(
    "success",
    state.order.customer.notesSuccess,
    "progress",
    state.order.customer.notesProgress,
    "fail",
    state.order.customer.notesFail
  );
  return {
    notes: NotesList,
    orderInfo: state.order.orderInfo.orderInfo,
    customerNotes: state.order.customer.customerNotesData,
    customerId: state.order.orderInfo.customerId,
    notesSuccess: state.order.customer.notesSuccess,
    notesProgress: state.order.customer.notesProgress,
    notesFail: state.order.customer.notesFail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConsumerNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
  };
};

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes);

export { NotesContainer };
