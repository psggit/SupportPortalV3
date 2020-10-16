import { connect } from "react-redux";
import { LogoutComponent } from "./LogoutComponent";
import { logoutSession } from "./duck";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    loginProgressStatus: state.login.loginProgressStatus,
    loginFailedStatus: state.login.loginFailedStatus,
    loginSuccessStatus: state.login.loginSuccessStatus,
    successMsg: state.login.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutSession: () => dispatch(logoutSession()),
  };
};
const LogoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutComponent);

export { LogoutContainer };
