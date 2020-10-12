import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { validateAuth } from "./duck/authOperation";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login/LoginContainer";
import { DashboardContainer } from "./containers/Dashboard/DashboardContainer";
import { OrderDetailsContainer } from "./containers/OrderDetails";
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
  useEffect(() => {
    props.validateAuth();
  }, []);
  console.log("[APP]");
  console.log(props);

  if (props.authenticateProgress) {
    return (
      <ThemeProvider theme={newTheme}>
        <Loading message="Loading..." />
      </ThemeProvider>
    );
  }

  return (
    <div>
      {props.authenticateSuccess ? (
        <ThemeProvider theme={newTheme}>
          <Router>
            <Switch>
              <Route path="/order-details" component={OrderDetailsContainer} />
              <Route path="/order-info" component={OrderInfoContainer} />

              <Route path="/dashboard" component={DashboardContainer} />

              {/* <Route path="/customer/123" component={CustomerDetailContainer} /> */}
              {/* <Route path="/form/123" component={CustomerForm} /> */}
              {/* <Route path="/soa/123" component={CustomerSoaContainer} /> */}
              {/* <Route path="/gift-soa/123" component={CustomerGiftSoaContainer} /> */}
              {/* <Route path="/rewards/123" component={RewardsContainer} /> */}
              <Route path="/notes/123" component={NotesContainer} />
              <Route path="/" component={LoginContainer} />
            </Switch>
          </Router>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={newTheme}>
          <Router>
            <Switch>
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
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
