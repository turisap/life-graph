import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import actionCreatorFactory from "typescript-fsa";

import { logginAsync } from "./redux/ducks/general";
import { Chart } from "components/Chart";
import avocado from "assets/avocado.png";
import { ErrorBoundary } from "components/ErrorBoundary";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logginAsync());
    // const actionCreator = actionCreatorFactory("OLOLO");

    // // specify parameters and result shapes as generic type arguments
    // const doSomething = actionCreator("DO_SOMETHING");

    // console.log(doSomething());
    // // {type: 'DO_SOMETHING_STARTED', payload: {foo: 'lol'}}
  });

  return (
    <ErrorBoundary>
      <img src={avocado} />
      <p>App</p>
      <Chart />
    </ErrorBoundary>
  );
};

export default App;
