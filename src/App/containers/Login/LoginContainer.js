import { connect } from "react-redux";
import { LoginComponent } from "./LoginComponent";
import { sendLoginEmail } from "./duck";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    loginProgressStatus: state.login.loginProgressStatus,
    loginFailedStatus: state.login.loginFailedStatus,
    loginSuccessStatus: state.login.loginSuccessStatus,
    successMsg: state.login.successMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLoginEmail: (email) => dispatch(sendLoginEmail(email)),
  }
}
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export { LoginContainer };
