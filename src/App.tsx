import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import NavBar from "components/base/NavBar";
import { CustomError } from "components/base/ErrorBoundary";
import NotFound from "components/base/404";
import Footer from "components/base/Footer";
import RouteWrapper from "components/base/RouteWrapper";
import Home from "components/Home";
import AddEvent from "components/AddEvent";
import Signin from "components/Signin";

import { theme } from "./theme";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <CustomError>
        <Router>
          <NavBar />
          <ThemeProvider theme={theme}>
            <Switch>
              <RouteWrapper component={Home} path="/" exact />
              <RouteWrapper component={Signin} path="/signin" exact />
              <RouteWrapper isPrivate component={AddEvent} path="/add-event" />
              <Route path="*" component={NotFound} />
            </Switch>
          </ThemeProvider>
          <Footer />
        </Router>
      </CustomError>
    </Provider>
  );
};

export default App;
