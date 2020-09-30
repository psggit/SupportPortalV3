import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login/LoginContainer";
import { DashboardContainer } from "./containers/Dashboard/";
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
            <Route path="/" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default hot(App);
