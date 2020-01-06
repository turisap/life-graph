import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import "typescript-fsa-redux-observable";
import { from, of } from "rxjs";
import { filter, exhaustMap, catchError } from "rxjs/operators";

import { db } from "../../../firebase/firebase";
import {
  EventReducerState,
  EventResponse,
  Event,
  EventRange
} from "../../types";

const eventsActionCreator = actionCreatorFactory("@Events");

export const postEventToFirestore = eventsActionCreator.async<Event, any, any>(
  "postEventToFirestore"
);
export const postRangeToFireStore = eventsActionCreator.async<
  EventRange,
  any,
  any
>("postRangeToFireStore");
export const getAllEvents = eventsActionCreator.async<any, any, any>(
  "getAllEvents"
);

const DEFAULT_STATE: EventReducerState = {
  events: [],
  eventRanges: [],
  eventLoading: false,
  rangeLoading: false
};

const events = reducerWithInitialState(DEFAULT_STATE);

events.case(getAllEvents.done, (state, payload: any) => {
  const events: Event[] = [];
  payload.forEach((doc: EventResponse) => events.push(doc.data()));
  return {
    ...state,
    events
  };
});

events.case(postEventToFirestore.started, state => ({
  ...state,
  eventLoading: true
}));

events.case(postEventToFirestore.done, state => ({
  ...state,
  eventLoading: false
}));

events.case(postRangeToFireStore.started, state => ({
  ...state,
  rangeLoading: true
}));

events.case(postRangeToFireStore.done, state => ({
  ...state,
  rangeLoading: false
}));

const eventsRef = db.collection("events");
const rangeRef = db.collection("ranges");

const createEventEpic$ = action$ =>
  action$.pipe(
    filter(postEventToFirestore.started.match),
    exhaustMap(({ payload: { eventTitle, eventColor, eventDate } }: any) => {
      return from(
        eventsRef
          .add({
            eventTitle,
            eventColor,
            eventDate: eventDate.utc().format()
          })
          .then(postEventToFirestore.done)
          .catch(postEventToFirestore.failed)
      );
    }),
    catchError(error =>
      of(
        postEventToFirestore.failed({
          error,
          params: {} as any
        })
      )
    )
  );

const createRangeEpic$ = action$ =>
  action$.pipe(
    filter(postRangeToFireStore.started.match),
    exhaustMap(
      ({ payload: { rangeTitle, rangeColor, startDate, endDate } }: any) => {
        return from(
          rangeRef
            .add({
              rangeTitle,
              rangeColor,
              startDate: startDate.utc().format(),
              endDate: endDate.utc().format()
            })
            .then(postRangeToFireStore.done)
            .catch(postRangeToFireStore.failed)
        );
      }
    ),
    catchError(error =>
      of(
        postRangeToFireStore.failed({
          error,
          params: {} as any
        })
      )
    )
  );

const getAllEventsEpic$ = action$ =>
  action$.pipe(
    filter(getAllEvents.started.match),
    exhaustMap(() => {
      return from(
        eventsRef
          .get()
          .then(getAllEvents.done)
          .catch(getAllEvents.failed)
      );
    }),
    catchError(error =>
      of(
        getAllEvents.failed({
          error,
          params: {} as any
        })
      )
    )
  );

const eventsEpic = combineEpics(
  createEventEpic$,
  getAllEventsEpic$,
  createRangeEpic$
);
export { events, eventsEpic };
