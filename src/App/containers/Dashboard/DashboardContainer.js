import { connect } from "react-redux";
import { DashboardComponent } from "./DashboardComponent";
import { fetchOrderDetails } from "./duck";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    loginProgress: state.login.loginProgress,
    loginFailed: state.login.loginFailed,
    loginSuccess: state.login.loginSuccess,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderDetails: (payload) => dispatch(fetchOrderDetails(payload)),
  }
}
const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export { DashboardContainer };
