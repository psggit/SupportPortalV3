import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

var mountNode = document.getElementById("app");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  mountNode
);
