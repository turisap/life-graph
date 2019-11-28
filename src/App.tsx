import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logginAsync } from "./redux/ducks/general";
import { Chart } from "components/Chart";
import avocado from "assets/avocado.png";
import { CustomError } from "components/ErrorBoundary";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logginAsync.started({ id: "6" }));
  });

  return (
    <CustomError>
      <img src={avocado} />
      <Chart />
    </CustomError>
  );
};

export default App;
