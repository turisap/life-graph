import { combineEpics, ofType } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import "typescript-fsa-redux-observable";
import { from } from "rxjs";
import { filter, ignoreElements, map, switchMap } from "rxjs/operators";

import { GeneralReducerState } from "../types";

const generalActionCreator = actionCreatorFactory("@General");

export const toggleSignIn = generalActionCreator("toggleSignIn");

export const logginAsync = generalActionCreator.async<{ id: string }, {}, {}>(
  "logginAsync"
);

const DEFAULT_STATE: GeneralReducerState = {
  signedin: false
};

const general = reducerWithInitialState(DEFAULT_STATE);

general.case(toggleSignIn, (state: GeneralReducerState, payload) => {
  return {
    ...state,
    signedin: !state.signedin
  };
});

general.case(logginAsync.done, state => ({
  ...state,
  signedin: !state.signedin
}));

const loggingEpic$ = action$ => {
  return action$.pipe(
    filter(logginAsync.started.match),
    switchMap(data =>
      from(
        fetch("https://jsonplaceholder.typicode.com/todos/1", {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          return ignoreElements();
        })
      )
    ),
    map(data => logginAsync.done(data as any))
  );
};

const generalEpic = combineEpics(loggingEpic$);
export { general, generalEpic };
