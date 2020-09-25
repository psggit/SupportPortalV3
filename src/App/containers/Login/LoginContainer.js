import { connect } from "react-redux";
import { LoginComponent } from "./LoginComponent";
import { sendLoginEmail } from "./duck";

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
    sendLoginEmail: (email) => dispatch(sendLoginEmail(email)),
  }
}
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export { LoginContainer };
