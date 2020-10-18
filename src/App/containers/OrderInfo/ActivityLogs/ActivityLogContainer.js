import { connect } from "react-redux";
import { ActivityLogComponent } from "./AcitivityLogComponent";
import { fetchLogData } from "./duck";

const mapStateToProps = (state) => {
  // console.clear();
  // console.log("mapStateToProps", state);
  return {
    orderId: state.home.orderId,
    activityData: state.order.activityLog.activityData,
    fetchLogProgress: state.order.activityLog.fetchLogProgress,
    fetchLogFailed: state.order.activityLog.fetchLogFailed,
    fetchLogSuccess: state.order.activityLog.fetchLogSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogData: (payload) => dispatch(fetchLogData(payload)),
  };
};

const ActivityLogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityLogComponent);

export { ActivityLogContainer };
