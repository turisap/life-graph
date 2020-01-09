import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import NavBar from "components/base/NavBar";
import { CustomError } from "components/base/ErrorBoundary";
import NotFound from "components/base/404";
import Footer from "components/base/Footer";
import RouteWrapper from "components/base/RouteWrapper";
import Home from "components/Home";

import { theme } from "./theme";

const App = () => {
  return (
    <CustomError>
      <Router>
        <NavBar />
        <ThemeProvider theme={theme}>
          <Switch>
            <RouteWrapper component={Home} path="/" exact />
            <Route path="*" component={NotFound} />
          </Switch>
        </ThemeProvider>
        <Footer />
      </Router>
    </CustomError>
  );
};

export default App;
