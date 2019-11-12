import React, { useEffect } from "react";
import "./styles.scss";

const Chart = () => {
  useEffect(() => {
    setTimeout(() => {
      throw new Error("ololo");
    }, 3000);
  }, []);

  return (
    <div className="chart">
      <h2>trolпорпорпорolo</h2>
    </div>
  );
};

export { Chart };
