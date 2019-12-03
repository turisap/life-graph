import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "components/NavBar";
import { CustomError } from "components/ErrorBoundary";
import NotFound from "components/404";
import Footer from "components/Footer";
import RouteWrapper from "components/RouteWrapper";
import Home from "components/Home";
import AddEvent from "components/AddEvent";

import { logginAsync } from "./redux/ducks/general";

import "./styles.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logginAsync.started({ id: "6" }));
  });

  return (
    <CustomError>
      <NavBar />
      <Router>
        <Switch>
          <RouteWrapper component={Home} path="/" exact />
          <RouteWrapper isPrivate component={AddEvent} path="/add-event" />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </CustomError>
  );
};

export default App;
