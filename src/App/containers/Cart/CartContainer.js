import { connect } from "react-redux";
import { CartComponent } from "./DashboardComponent";
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
const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export { CartContainer };
