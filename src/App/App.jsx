import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login/LoginContainer";
import { DashboardContainer } from "./containers/Dashboard/Dashboard";
import { CustomerDetailContainer } from './containers/Customer/CustomerCard'
import {CustomerForm} from './containers/Customer/CustomerFormDetails/CustomerFormComponent'
// import { CustomerSoa } from './containers/Customer/CustomerSoa/CustomerSoaComponent'
import {CustomerSoaContainer} from './containers/Customer/CustomerSoa'
import { CustomerGiftSoaContainer } from './containers/Customer/CustomerGiftSoa'
import {RewardsContainer} from './containers/Customer/Rewards'
import {NotesContainer} from './containers/Customer/Notes'
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
            <Route path="/gift-soa/123" component={CustomerGiftSoaContainer} />
            <Route path="/rewards/123" component={RewardsContainer} />
            <Route path="/notes/123" component={NotesContainer} />
            <Route path="/" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default hot(App);
