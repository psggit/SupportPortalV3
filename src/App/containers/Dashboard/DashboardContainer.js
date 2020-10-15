import { connect } from "react-redux";
import { DashboardComponent } from "./DashboardComponent";
import { fetchOrderDetails, preponeOrder, fetchDeliveryStatus } from "./duck";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    fetchDetailsProgress: state.home.fetchDetailsProgress,
    fetchDetailsFail: state.home.fetchDetailsFail,
    fetchDetailsSuccess: state.home.fetchDetailsSuccess,
    preponeOrderSuccess: state.home.preponeOrderSuccess,
    preponeOrderFailed: state.home.preponeOrderFailed,
    preponeOrderProgress: state.home.preponeOrderProgress,
    fetchDeliverySuccess: state.home.fetchDeliverySuccess,
    fetchDeliveryFailed: state.home.fetchDeliveryFailed,
    fetchDeliveryProgress: state.home.fetchDeliveryProgress,
    errorMsg: state.home.errorMsg,
    successMsg: state.home.successMsg,
    deliveryStatus: state.home.deliveryStatus,
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
