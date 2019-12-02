import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "components/NavBar";
import { CustomError } from "components/ErrorBoundary";
import NotFound from "components/404";
import Footer from "components/Footer";

import { withPage } from "lib/withPage";
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
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </CustomError>
  );
};

export default App;
