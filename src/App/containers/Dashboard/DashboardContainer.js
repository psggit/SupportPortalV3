import { connect } from "react-redux";
import { DashboardComponent } from "./DashboardComponent";
import { fetchOrderDetails, preponeOrder, fetchDeliveryStatus } from "./duck";

const mapStateToProps = (state) => {
  return {
    fetchDetailsProgress: state.dashboard.fetchDetailsProgress,
    preponeOrderSuccess: state.dashboard.preponeOrderSuccess,
    preponeOrderFailed: state.dashboard.preponeOrderFailed,
    preponeOrderProgress: state.dashboard.preponeOrderProgress,
    fetchDeliverySuccess: state.dashboard.fetchDeliverySuccess,
    fetchDeliveryFailed: state.dashboard.fetchDeliveryFailed,
    fetchDeliveryProgress: state.dashboard.fetchDeliveryProgress,
    errorMsg: state.dashboard.errorMsg,
    successMsg: state.dashboard.successMsg,
    deliveryStatus: state.dashboard.deliveryStatus,
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
