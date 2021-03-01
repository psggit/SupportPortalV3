import { connect } from "react-redux";
import { DashboardComponent } from "./DashboardComponent";
import { fetchOrderDetails, preponeOrder, fetchDeliveryStatus } from "./duck";

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderDetails: (payload) => dispatch(fetchOrderDetails(payload)),
    preponeOrder: (payload) => dispatch(preponeOrder(payload)),
    fetchDeliveryStatus: () => dispatch(fetchDeliveryStatus()),
  };
};
const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export { DashboardContainer };
