import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login/LoginContainer";
import { DashboardContainer } from "./containers/Dashboard/Dashboard";
import { CustomerDetailContainer } from './containers/Customer/CustomerCard'
import {CustomerForm} from './containers/Customer/CustomerFormDetails/CustomerFormComponent'
// import { CustomerSoa } from './containers/Customer/CustomerSoa/CustomerSoaComponent'
import {CustomerSoaContainer} from './containers/Customer/CustomerSoa'

import { ThemeProvider } from "@material-ui/styles";
import newTheme from "./sass/theme";
import "./sass/app.scss";

function App() {
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <Router>
          <Switch>
            <Route path="/dashboard" component={DashboardContainer} />
            <Route path="/customer/123" component={CustomerDetailContainer} />
            <Route path="/form/123" component={CustomerForm} />
            <Route path="/soa/123" component={CustomerSoaContainer} />
            <Route path="/" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default hot(App);
