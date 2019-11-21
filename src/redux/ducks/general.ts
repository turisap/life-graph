import { reducerWithInitialState } from "typescript-fsa-reducers";
import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { delay, map, tap, ignoreElements } from "rxjs/operators";
import "typescript-fsa-redux-observable";

import { GeneralReducerState } from "../types";

const generalActionCreator = actionCreatorFactory("@General");

export const toggleSignIn = generalActionCreator("toggleSignIn");

// TODO make this one async
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

const loggingEpic$ = action$ =>
  action$.filter(logginAsync.started.match).switchMap(action => {
    return logginAsync.done({
      params: action.payload,
      result: {
        bar: "bar"
      }
    });
  });

const counterDecrementEpic = action$ =>
  action$
    .ofAction(logginAsync.started)
    .delay(300)
    .map(action =>
      logginAsync.done({
        params: (action as any).payload,
        result: {
          bar: "bar"
        }
      })
    );
const generalEpic = combineEpics(counterDecrementEpic);
export { general, generalEpic };
