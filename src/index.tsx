import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css";
import "./styles.scss";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import App from "./App";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
