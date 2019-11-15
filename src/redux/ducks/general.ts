import { reducerWithInitialState } from "typescript-fsa-reducers";
import { combineEpics, Epic, createEpicMiddleware } from "redux-observable";

import { toggleSignIn, logginAsync } from "../actions";
import { GeneralReducerState } from "../types";

const DEFAULT_STATE: GeneralReducerState = {
  signedin: false
};

const general = reducerWithInitialState(DEFAULT_STATE);

general.case(toggleSignIn, (state: GeneralReducerState, payload: any) => ({
  ...state,
  signedin: !state.signedin
}));

const loggingEpic = (action$, { getState }) =>
  action$
    .ofType(logginAsync.match)
    .switchMap(() => {
      return fetch("/https://ololo.ru");
    })
    .map(data => console.log(data))
    .catchWith(err => console.log(err));

const generalEpic = combineEpics(loggingEpic);
export { general, generalEpic };
