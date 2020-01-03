import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import "typescript-fsa-redux-observable";
import moment, { Moment } from "moment";

import { firestore } from "../../../firebase/firebase";
import { EventReducerState } from "../../types";

const eventsActionCreator = actionCreatorFactory("@Events");

export const setEventDate = eventsActionCreator<Moment>("setEventDate");

const DEFAULT_STATE: EventReducerState = {
  event: {
    date: moment()
  },

  eventRange: {
    from: moment(),
    to: moment().add(1, "day")
  }
};

const events = reducerWithInitialState(DEFAULT_STATE);

events.case(setEventDate, (state, payload) => ({
  ...state,
  event: {
    ...state.event,
    date: payload
  }
}));

const eventsEpic = combineEpics();
export { events, eventsEpic };
