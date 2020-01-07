import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { times } from "ramda";

import { getAllEvents, getAllRanges } from "../redux/ducks/events";
import Chart from "./base/Chart";

// TODO clean up fields on forms submits
// TODO disable dates on form submit

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents.started({}));
    dispatch(getAllRanges.started({}));
  }, []);

  const getMonthScale = () => {
    const monthNames: string[] = [];
    const lastMonth = moment().subtract(12, "months");
    const currentMonth = moment();

    while (currentMonth.diff(lastMonth, "month") > 0) {
      monthNames.push(currentMonth.format("MMM"));
      currentMonth.subtract(1, "month");
    }

    return monthNames;
  };

  const emptyDays = () =>
    times(
      () => ({
        id: Math.random().toFixed(10),
        color: "#ffffff",
        title: "nothing"
      }),
      7
    );

  const emptyWeeks = times(
    () => ({
      id: Math.random(),
      days: emptyDays()
    }),
    52
  );

  return (
    <div className="ornament__background">
      <div className="overlay">
        <Chart weeks={emptyWeeks} months={getMonthScale()} />
      </div>
    </div>
  );
};

export default Home;
