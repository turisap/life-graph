import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import actionCreatorFactory from "typescript-fsa";

import { logginAsync } from "./redux/ducks/general";
import { Chart } from "components/Chart";
import avocado from "assets/avocado.png";
import { CustomError } from "components/ErrorBoundary";
const a = 4;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logginAsync.started({ id: "6" }));
  });

  return (
    <CustomError>
      <img src={avocado} />
      <p>Apprrr</p>
      <p>Apprrr</p>
      <Chart />
    </CustomError>
  );
};

export default App;
