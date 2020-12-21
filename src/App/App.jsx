import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { validateAuth } from "./duck/authOperation";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login";
import { LogoutContainer } from "./containers/Logout";
import { DashboardContainer } from "./containers/Dashboard";
import { IssuesContainer } from "./containers/Issues";
import { HipcoinsContainer } from "./containers/Hipcoins";
import { HipcoinsDetailsContainer } from "./containers/HipcoinsDetails";
import { OrderDetailsContainer } from "./containers/OrderDetails";
import { CartModificationContainer } from "./containers/CartModification";
import { OrderInfoContainer } from "./containers/OrderInfo";
import { ThemeProvider } from "@material-ui/styles";
import Loading from "./components/loading";
import newTheme from "./sass/theme";
import "./sass/app.scss";
import { RetailerNotesContainer } from "./containers/Retailer/RetailerNotes/RetailerNotesContainer";
import { ChangeRetailerContainer } from "./containers/Retailer/ChangeRetailer/ChangeRetailerContainer";
import { CustomerFormContainer } from "./containers/Customer/CustomerFormDetails";
import { CustomerSoaContainer } from "./containers/Customer/CustomerSoa";
import { CustomerGiftSoaContainer } from "./containers/Customer/CustomerGiftSoa";
import { RewardsContainer } from "./containers/Customer/Rewards";
import { NotesContainer } from "./containers/Customer/Notes";
import { ActivityListContainer } from "./containers/ActivityList";
import { DaNotesContainer } from "./containers/DeliveryAgentNotes";
import { OrderTrackingContainer } from "./containers/OrderTracking";
import { OrderModificationContainer } from "./containers/OrderModification";
import { createSession } from "./utils";
import { HipcoinSoaContainer } from "./containers/Customer/HipcoinSoa";
import { ModificationListContainer } from "./containers/ModificationList/ModificationListContainer";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) {
      props.validateAuth();
    }
    if (props.authenticateSuccess) {
      setIsLoggedIn(true);
      // console.log("authenticateSuccess", props.authData);
      createSession(props.authData);
    }
  }, [props.authenticateSuccess]);

  if (props.authenticateProgress) {
    return (
      <ThemeProvider theme={newTheme}>
        <Loading message="Loading..." />
      </ThemeProvider>
    );
  }

  // console.log("success ", success);
  return (
    <div>
      {isLoggedIn === true ? (
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
              <Route path="/activity-list" component={ActivityListContainer} />

              <Route
                path="/change-retailer"
                component={ChangeRetailerContainer}
              />
              <Route
                path="/retailer-notes"
                component={RetailerNotesContainer}
              />
              <Route
                path="/customer-detail"
                component={CustomerFormContainer}
              />
              <Route path="/soa" component={CustomerSoaContainer} />
              <Route path="/gift-soa" component={CustomerGiftSoaContainer} />
              <Route path="/hipcoin-soa" component={HipcoinSoaContainer} />
              <Route path="/rewards" component={RewardsContainer} />
              <Route path="/notes" component={NotesContainer} />

              <Route path="/da-notes" component={DaNotesContainer} />
              <Route path="/issues" component={IssuesContainer} />
              <Route exact path="/hipcoins" component={HipcoinsContainer} />
              <Route
                exact
                path="/hipcoins/order-details/:orderId"
                component={HipcoinsDetailsContainer}
              />

              <Route
                path="/order-tracking"
                component={OrderTrackingContainer}
              />

              <Route
                path="/order-modification"
                component={OrderModificationContainer}
              />

              <Route
                path="/modification-list"
                component={ModificationListContainer}
              />

              <Route path="/login" component={LoginContainer} />
              <Route path="/logout" component={LogoutContainer} />

              <Route
                path="/"
                component={
                  isLoggedIn
                    ? function () {
                        return <Redirect to="/dashboard" />;
                      }
                    : function () {
                        return <Redirect to="/login" />;
                      }
                }
              />
            </Switch>
          </Router>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={newTheme}>
          <Router>
            <Switch>
              <Route path="/logout" component={LogoutContainer} />
              <Route path="/login" component={LoginContainer} />
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
