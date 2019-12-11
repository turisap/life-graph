import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css";
import "./styles.scss";

import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
