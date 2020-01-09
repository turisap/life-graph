import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import "typescript-fsa-redux-observable";
import { from, of } from "rxjs";
import {
  filter,
  switchMap,
  exhaustMap,
  catchError,
  delay
} from "rxjs/operators";

import { GeneralReducerState } from "../../types";
import { firestore } from "../../../firebase/firebase";

const generalActionCreator = actionCreatorFactory("@General");

export const logginAsync = generalActionCreator.async<
  { email: string; password: string },
  { payload: any },
  { error: any }
>("logginAsync");

const DEFAULT_STATE: GeneralReducerState = {};

const general = reducerWithInitialState(DEFAULT_STATE);

general.case(logginAsync.started, state => ({
  ...state,
  signInLoading: true
}));

const generalEpic = combineEpics();
export { general, generalEpic };
