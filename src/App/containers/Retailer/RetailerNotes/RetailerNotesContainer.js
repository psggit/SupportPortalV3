import { connect } from "react-redux";
import { RetailerNotesComponent } from "./RetailerNotesComponent";
// import { retailerNotes } from "./mockData";
import { fetchRetailerNotesList } from "./duck/operation";

const mapStateToProps = (state) => {
  console.log("[soaContainer]", state);
  return {
    notesList: state.notes.retailerNotesList,
    orderId: state.order.orderInfo.orderDetails,
    notesProgress: state.notes.notesProgress,
    notesSuccess: state.notes.notesSuccess,
    orderInfo: state.order.orderInfo.orderDetails,
    notesFail: state.order.orderInfo.notesFail,
    errorMsg: state.order.orderInfo.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRetailerNotesList: (payload) =>
      dispatch(fetchRetailerNotesList(payload)),
  };
};

const RetailerNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerNotesComponent);

export { RetailerNotesContainer };
