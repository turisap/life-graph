import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css";

import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById("app")
);
