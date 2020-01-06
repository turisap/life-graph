import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllEvents } from "../redux/ducks/events";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents.started({}));
  }, []);

  return (
    <div className="ornament__background">
      <div className="overlay"></div>
    </div>
  );
};

export default Home;
