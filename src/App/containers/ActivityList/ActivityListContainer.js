import { connect } from "react-redux";
import { ActivityListComponent } from "./ActivityListComponent";
// import { retailerNotes } from "./mockData";
import { fetchActLogsList } from "./duck";

const mapStateToProps = (state) => {
  console.log("[activityLogs]", state);
  return {
    acitivityLog: state.acitivityLog,
    orderData: state.order.orderInfo.orderInfo.order_id,
    // orderId: "50011546022614",
    notesProgress: state.acitivityLog.notesProgress,
    notesSuccess: state.acitivityLog.notesSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActLogsList: (payload) => dispatch(fetchActLogsList(payload)),
  };
};

const ActivityListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityListComponent);

export { ActivityListContainer };
