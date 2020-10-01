import { connect } from "react-redux";
import { DashboardComponent } from "./DashboardComponent";
import { fetchOrderDetails } from "./duck";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    fetchDetailsProgress: state.home.fetchDetailsProgress,
    fetchDetailsFail: state.home.fetchDetailsFail,
    fetchDetailsSuccess: state.home.fetchDetailsSuccess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderDetails: (payload) => dispatch(fetchOrderDetails(payload)),
  };
};
const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export { DashboardContainer };
