import { connect } from "react-redux";
import { ActivityListComponent } from "./ActivityListComponent";
import { fetchActLogsList } from "./duck";

const mapStateToProps = (state) => {
  return {
    acitivityLog: state.acitivityLog,
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
