import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./App/store/store";

import { App } from "./App";

var mountNode = document.getElementById("app");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  mountNode
);
