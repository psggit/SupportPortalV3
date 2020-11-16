import { connect } from "react-redux";
import { RetailerNotesComponent } from "./RetailerNotesComponent";
import { fetchRetailerNotesList, fetchNoteList } from "./duck/operation";
import { createNotes } from "../../OrderInfo/duck";
import { resetOnUnmount } from "../../OrderInfo/duck";

const mapStateToProps = (state) => {
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
    issueListProgress: state.notes.issueListProgress,
    issueListFailure: state.notes.issueListFailure,
    issueListSuccess: state.notes.issueListSuccess,
    issueListData: state.notes.issueListData,
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
