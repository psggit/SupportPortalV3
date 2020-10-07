import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./containers/Login/LoginContainer";
import { DashboardContainer } from "./containers/Dashboard/";
import { OrderDetailsContainer } from "./containers/OrderDetails";
import { OrderInfoContainer } from "./containers/OrderInfo";
import { ThemeProvider } from "@material-ui/styles";
import { RetailerNotesListContainer } from "./containers/RetailerDetails/RetailerNotesList/RetailerNotesListContainer"
import newTheme from "./sass/theme";
import "./sass/app.scss";
import { authAPI } from "./utils";

function App() {
  useEffect(() => {
    // console.log("[APP]");
    authAPI();
  }, []);
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <Router>
          <Switch>
            <Route path="/order-details" component={OrderDetailsContainer} />
            <Route path="/order-info" component={OrderInfoContainer} />
            <Route path="/dashboard" component={DashboardContainer} />
            {/* <Route path="/order-details/123" component={DeliveryAgentContainer} /> */}
            {/* <Route path="/order-details/1234" component={RetailerContainer} /> */}
           <Route path="/order-details/notes" component={RetailerNotesListContainer} />
            {/* <Route path="/order-details/change-retailer" component={ChangeRetailerContainer} /> */} */}
            <Route path="/" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default hot(App);
