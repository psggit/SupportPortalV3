import { connect } from "react-redux";
import { ActivityListComponent } from "./ActivityListComponent";
// import { retailerNotes } from "./mockData";
import { fetchRetailerNotesList } from "./duck";

const mapStateToProps = (state) => {
  console.log("[soaContainer]", state);
  return {
    notesList: state.acitivityLog.retailerNotesList,
    orderId: state.order.orderInfo.orderDetails,
    notesProgress: state.notes.notesProgress,
    notesSuccess: state.notes.notesSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRetailerNotesList: (payload) =>
      dispatch(fetchRetailerNotesList(payload)),
  };
};

const ActivityListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityListComponent);

export { ActivityListContainer };
