import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { times } from "ramda";

import {
  getAllEventsForCurrentYear,
  getAllRangesForCurrentYear
} from "../redux/ducks/events";
import { RootState, EventRange, Event, Week, Day } from "../types";
import Chart from "./base/Chart";

// TODO clean up fields on forms submits
// TODO disable dates if end is before start

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const ranges = useSelector((state: RootState) => state.events.eventRanges);

  useEffect(() => {
    dispatch(getAllEventsForCurrentYear.started({}));
    dispatch(getAllRangesForCurrentYear.started({}));
  }, []);

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
        <Chart events={events} ranges={ranges} />
      </div>
    </div>
  );
};

export default Home;
