import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { validateAuth } from "./duck/authOperation";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login";
import { LogoutContainer } from "./containers/Logout";
import { DashboardContainer } from "./containers/Dashboard";
import { OrderDetailsContainer } from "./containers/OrderDetails";
import { CartModificationContainer } from "./containers/CartModification";
import { OrderInfoContainer } from "./containers/OrderInfo";
import { ThemeProvider } from "@material-ui/styles";
import Loading from "./components/loading";
import newTheme from "./sass/theme";
import "./sass/app.scss";
// import { CustomerDetailContainer } from './containers/Customer/CustomerCard'
// import {CustomerForm} from './containers/Customer/CustomerFormDetails/CustomerFormComponent'
// import { CustomerSoa } from './containers/Customer/CustomerSoa/CustomerSoaComponent'
// import {CustomerSoaContainer} from './containers/Customer/CustomerSoa'
// import { CustomerGiftSoaContainer } from './containers/Customer/CustomerGiftSoa'
// import {RewardsContainer} from './containers/Customer/Rewards'
import { NotesContainer } from "./containers/Customer/Notes";

function App(props) {
  let history = useHistory();
  useEffect(() => {
    // console.log(props);
    // console.log(history);
    // const node = this.wrapper.current;
    props.validateAuth();
  }, []);

  if (props.authenticateProgress) {
    return (
      <ThemeProvider theme={newTheme}>
        <Loading message="Loading..." />
      </ThemeProvider>
    );
  }

  let success = props.authenticateSuccess;

  return (
    <div>
      {success ? (
        <ThemeProvider theme={newTheme}>
          <Router>
            <Switch>
              <Route path="/order-details" component={OrderDetailsContainer} />
              <Route
                path="/order-info/:orderId"
                component={OrderInfoContainer}
              />
              <Route path="/dashboard" component={DashboardContainer} />
              <Route
                path="/cart-modify"
                component={CartModificationContainer}
              />
              <Route path="/notes/123" component={NotesContainer} />
              <Route path="/" component={LoginContainer} />
            </Switch>
          </Router>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={newTheme}>
          <Router>
            <Switch>
              <Route path="/logout" component={LogoutContainer} />
              <Route path="/" component={LoginContainer} />
            </Switch>
          </Router>
        </ThemeProvider>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    authenticateProgress: state.login.authenticateProgress,
    authenticateSuccess: state.login.authenticateSuccess,
    authenticateFailed: state.login.authenticateFailed,
    authData: state.login.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateAuth: () => dispatch(validateAuth()),
  };
};

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticateProgress: PropTypes.bool,
  authenticateFailed: PropTypes.bool,
  authenticateSuccess: PropTypes.bool,
  validateAuth: PropTypes.func,
  authData: PropTypes.any,
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
