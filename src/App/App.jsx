import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login";
import { DashboardContainer } from "./containers/Dashboard/Dashboard";
import { DeliveryAgentContainer } from "./containers/DeliveryAgentDetails";
import { RetailerContainer } from "./containers/RetailerDetails";
import { RetailerNotesListContainer } from "./containers/RetailerDetails/RetailerNotesList/RetailerNotesListContainer";
import { ThemeProvider } from "@material-ui/styles";
import newTheme from "./sass/theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <Router>
          <Switch>
            <Route path="/dashboard" component={DashboardContainer} />
            <Route path="/order-details/123" component={DeliveryAgentContainer} />
            <Route path="/order-details/1234" component={RetailerContainer} />
            <Route path="/order-details/notes" component={RetailerNotesListContainer} />
            <Route path="/" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default hot(App);
