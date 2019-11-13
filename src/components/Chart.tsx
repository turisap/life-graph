import React, { useEffect } from "react";
import "./styles.scss";

const Chart = () => {
  useEffect(() => {
    throw new ReferenceError("ololo");
  }, []);

  return (
    <div className="chart">
      <h2>trolпорпорпорolo</h2>
    </div>
  );
};

export { Chart };
