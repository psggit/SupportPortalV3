import { connect } from "react-redux";
import { LogoutComponent } from "./LogoutComponent";
import { logout } from "./duck/logoutOperations";
// import { logoutSession } from "./duck";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    loginProgressStatus: state.login.loginProgressStatus,
    loginFailedStatus: state.login.loginFailedStatus,
    loginSuccessStatus: state.login.loginSuccessStatus,
    successMsg: state.login.successMsg,
    logoutSuccess: state.logout.logoutSuccess,
    logoutFailed: state.logout.logoutFailed,
    logoutProgress: state.logout.logoutProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    // logoutSession: () => dispatch(logoutSession()),
  };
};
const LogoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutComponent);

export { LogoutContainer };
