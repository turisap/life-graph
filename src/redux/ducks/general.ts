import { reducerWithInitialState } from "typescript-fsa-reducers";
import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { ofType } from "redux-observable";
import { catchError, ignoreElements, switchMap, map } from "rxjs/operators";
import { from } from "rxjs";

import { GeneralReducerState } from "../types";

const generalActionCreator = actionCreatorFactory("@General");

export const toggleSignIn = generalActionCreator("toggleSignIn");

// TODO make this one async
export const logginAsync = generalActionCreator.async("logginAsync");

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

const loggingEpic$ = (action$, { getState }) =>
  action$
    .filter(logginAsync.started.match)
    .delay(2000)
    .map(action => {
      return logginAsync.done({
        params: action.payload,
        result: {
          bar: "bar"
        }
      });
    });

const generalEpic = combineEpics(loggingEpic$);
export { general, generalEpic };
