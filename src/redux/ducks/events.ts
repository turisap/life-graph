import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import "typescript-fsa-redux-observable";
import moment from "moment";
import { from, of } from "rxjs";
import { filter, exhaustMap, catchError, switchMap, tap } from "rxjs/operators";

import { db } from "../../../firebase/firebase";
import {
  EventReducerState,
  EventResponse,
  RangeResponse,
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
export const getAllEventsForCurrentYear = eventsActionCreator.async(
  "getAllEventsForCurrentYear"
);
export const getAllRangesForCurrentYear = eventsActionCreator.async(
  "getAllRangesForCurrentYear"
);

export const getCurrentRange = eventsActionCreator.async<
  any,
  RangeResponse[],
  any
>("getCurrentRange");

const DEFAULT_STATE: EventReducerState = {
  events: [],
  eventRanges: [],
  eventLoading: false,
  rangeLoading: false,
  homeDataLoading: false
};

const events = reducerWithInitialState(DEFAULT_STATE);

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

events.case(getAllEventsForCurrentYear.started, state => ({
  ...state,
  homeDataLoading: true
}));

events.case(getAllEventsForCurrentYear.done, (state, payload: any) => {
  const events: Event[] = [];
  payload.forEach((doc: EventResponse) => events.push(doc.data()));
  return {
    ...state,
    events
  };
});

events.case(getAllRangesForCurrentYear.done, (state, payload: any) => {
  const eventRanges: EventRange[] = [];
  payload.forEach((doc: RangeResponse) => eventRanges.push(doc.data()));
  return {
    ...state,
    eventRanges
  };
});

events.case(getCurrentRange.done, (state, payload: any) => {
  const lastRange: EventRange[] = [];
  payload.forEach((doc: RangeResponse) => lastRange.push(doc.data()));
  return {
    ...state,
    eventRanges: state.eventRanges.concat(lastRange)
  };
});

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
              endDate: endDate ? endDate.utc().format() : ""
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

const getAllEventsForCurrentYearEpic$ = action$ =>
  action$.pipe(
    filter(getAllEventsForCurrentYear.started.match),
    exhaustMap(() =>
      from(
        eventsRef
          .where(
            "eventDate",
            ">",
            moment()
              .subtract(1, "year")
              .utc()
              .format()
          )
          .get()
          .then(getAllEventsForCurrentYear.done)
          .catch(getAllEventsForCurrentYear.failed)
      )
    ),
    catchError(error =>
      of(
        getAllEventsForCurrentYear.failed({
          error,
          params: {} as any
        })
      )
    )
  );

const getAllRangesForCurrentYearEpic$ = action$ =>
  action$.pipe(
    filter(getAllRangesForCurrentYear.started.match),
    switchMap(() =>
      from(
        rangeRef
          .where(
            "endDate",
            ">",
            moment()
              .subtract(1, "year")
              .utc()
              .format()
          )
          .get()
          .then(getAllRangesForCurrentYear.done)
          .catch(getAllRangesForCurrentYear.failed)
      )
    ),
    catchError(error =>
      of(
        getAllRangesForCurrentYear.failed({
          error,
          params: {} as any
        })
      )
    )
  );

const getCurrentRangeEpic$ = action$ =>
  action$.pipe(
    filter(getAllRangesForCurrentYear.done.match),
    switchMap(() =>
      from(
        rangeRef
          .where("endDate", "==", "")
          .get()
          .then(getCurrentRange.done)
          .catch(getCurrentRange.failed)
      )
    ),
    catchError(error =>
      of(
        getCurrentRange.failed({
          error,
          params: {} as any
        })
      )
    )
  );

const eventsEpic = combineEpics(
  createEventEpic$,
  getAllEventsForCurrentYearEpic$,
  getAllRangesForCurrentYearEpic$,
  createRangeEpic$,
  getCurrentRangeEpic$
);
export { events, eventsEpic };
