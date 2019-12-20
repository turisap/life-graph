import { combineEpics } from "redux-observable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import "typescript-fsa-redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError } from "rxjs/operators";

import { GeneralReducerState, SignInFireBaseResponseShape } from "../types";
import { myFirebase } from "../../../firebase/firebase";

const generalActionCreator = actionCreatorFactory("@General");

export const logginAsync = generalActionCreator.async<
  { email: string; password: string },
  { payload: SignInFireBaseResponseShape },
  { error: any }
>("logginAsync");

const DEFAULT_STATE: GeneralReducerState = {
  signedin: false,
  signInLoading: false,
  user: {
    refreshToken: null,
    accessToken: null
  },
  authError: ""
};

const general = reducerWithInitialState(DEFAULT_STATE);

general.case(logginAsync.started, state => ({
  ...state,
  signInLoading: true
}));

general.case(logginAsync.done, (state, user: any) => {
  return {
    ...state,
    signInLoading: false,
    signedin: true,
    user: {
      refreshToken: user.userrefreshToken,
      accessToken: user.user.ma
    },
    authError: ""
  };
});
general.case(logginAsync.failed, state => ({
  ...state,
  signInLoading: false,
  authError: "*** there has been an error logging you in"
}));

const loggingEpic$ = action$ => {
  return action$.pipe(
    filter(logginAsync.started.match),
    switchMap(({ payload: { email, password } }: any) => {
      return from(
        myFirebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(logginAsync.done)
          .catch(logginAsync.failed)
      );
    }),
    catchError(error =>
      of(
        logginAsync.failed({
          error,
          params: {} as any
        })
      )
    )
  );
};

const generalEpic = combineEpics(loggingEpic$);
export { general, generalEpic };
