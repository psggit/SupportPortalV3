import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            component={() => {
              return <div> Hello World! </div>;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default hot(App);
