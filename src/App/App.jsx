import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { DeliveryAgentContainer } from "./containers/DeliveryAgentDetails";
import { LoginContainer } from "./containers/Login/LoginContainer";
import { DashboardContainer } from "./containers/Dashboard/";
import { OrderDetailsContainer } from "./containers/OrderDetails";
import { OrderInfoContainer } from "./containers/OrderInfo";
import { ThemeProvider } from "@material-ui/styles";
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
            <Route exact path="/dashboard" component={DashboardContainer} />
            {/* <Route path="/order-details/123" component={DeliveryAgentContainer} /> */}
            <Route path="/" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default hot(App);
