import React, { useEffect } from "react";
import { Chart } from "components/Chart";
import avocado from "assets/avocado.png";
import { ErrorBoundary } from "components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <img src={avocado} />
      <p>App</p>
      <Chart />
    </ErrorBoundary>
  );
};

export default App;
