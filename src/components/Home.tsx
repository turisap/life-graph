import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllEventsForCurrentYear,
  getAllRangesForCurrentYear
} from "../redux/ducks/events";
import { RootState } from "../types";
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

  return (
    <div className="ornament__background">
      <div className="overlay">
        <Chart events={events} ranges={ranges} />
      </div>
    </div>
  );
};

export default Home;
