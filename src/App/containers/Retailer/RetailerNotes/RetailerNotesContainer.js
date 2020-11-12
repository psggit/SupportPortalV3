import { connect } from "react-redux";
import { RetailerNotesComponent } from "./RetailerNotesComponent";
import { fetchRetailerNotesList, fetchNoteList } from "./duck/operation";
import { createNotes } from "../../OrderInfo/duck";
import { resetOnUnmount } from "../../OrderInfo/duck";

const mapStateToProps = (state) => {
  //console.log("[retailerNoteContainer]", state.note.retailerTypeNoteList);
  return {
    notesList: state.notes.retailerNotesList,
    orderId: state.order.orderInfo.orderDetails,
    notesProgress: state.notes.notesProgress,
    notesSuccess: state.notes.notesSuccess,
    orderInfo: state.order.orderInfo.orderDetails,
    notesFail: state.order.orderInfo.notesFail,
    errorMsg: state.order.orderInfo.errorMsg,
    successMsg: state.order.orderInfo.successMsg,
    createNotesSuccess: state.order.orderInfo.createNotesSuccess,
    createNotesFailure: state.order.orderInfo.createNotesFailure,
    // retailerTypeNoteList: state.note.retailerTypeNoteList,
    // fetchRetailerNotesListSuccess: state.note.fetchRetailerNotesListSuccess,
    // fetchRetailerNotesListFailure: state.note.fetchRetailerNotesListFailure,
    // fetchRetailerNotesListProgress: state.note.fetchRetailerNotesListProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRetailerNotesList: (payload) =>
      dispatch(fetchRetailerNotesList(payload)),
    createNotes: (type) => dispatch(createNotes(type)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
    fetchNoteList: () => dispatch(fetchNoteList()),
  };
};

const RetailerNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerNotesComponent);

export { RetailerNotesContainer };
