import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import NavBar from "components/base/NavBar";
import { CustomError } from "components/base/ErrorBoundary";
import NotFound from "components/base/404";
import Footer from "components/base/Footer";
import RouteWrapper from "components/base/RouteWrapper";
import Home from "components/Home";
import AddEvent from "components/AddEvent";
import Signin from "components/Signin";

import { theme } from "./theme";

const App = () => {
  return (
    <CustomError>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <RouteWrapper component={Home} path="/" exact />
            <RouteWrapper component={Signin} path="/signin" exact />
            <RouteWrapper isPrivate component={AddEvent} path="/add-event" />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
      <Footer />
    </CustomError>
  );
};

export default App;
