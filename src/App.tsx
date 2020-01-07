import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "components/base/NavBar";
import { CustomError } from "components/base/ErrorBoundary";
import NotFound from "components/base/404";
import Footer from "components/base/Footer";
import RouteWrapper from "components/base/RouteWrapper";
import Home from "components/Home";
import AddEvent from "components/AddEvent";
import Signin from "components/Signin";

import { theme } from "./theme";

import { firestore } from "../firebase/firebase";
import { logginAsync } from "./redux/ducks/general";
import { RootState, User } from "./types";

// TODO push notifications with timers as at work

const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: RootState) => state.general.signedin
  );

  const runAuth = (): void => {
    firestore.auth().onAuthStateChanged((user: User) => {
      if (user) {
        const payload = { user };
        dispatch(logginAsync.done(payload as any));
      }
    });
  };

  useEffect(() => {
    if (!authenticated) {
      runAuth();
    }
  }, [authenticated]);

  return (
    <CustomError>
      <Router>
        <NavBar />
        <ThemeProvider theme={theme}>
          <Switch>
            <RouteWrapper component={Home} path="/" exact />
            <RouteWrapper component={Signin} path="/signin" exact />
            <RouteWrapper component={AddEvent} isPrivate path="/create-event" />
            <Route path="*" component={NotFound} />
          </Switch>
        </ThemeProvider>
        <Footer />
      </Router>
    </CustomError>
  );
};

export default App;
