import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

import { logginAsync } from "./redux/ducks/general";
import { theme } from "./theme";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logginAsync.started({ id: "6" }));
  });

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
