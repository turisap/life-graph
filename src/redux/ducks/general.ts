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

import { GeneralReducerState, SignInFireBaseResponseShape } from "../types";
import { firestore } from "../../../firebase/firebase";

const generalActionCreator = actionCreatorFactory("@General");

export const logginAsync = generalActionCreator.async<
  { email: string; password: string },
  { payload: SignInFireBaseResponseShape },
  { error: any }
>("logginAsync");
export const setLoginSuccessFlag = generalActionCreator<boolean>(
  "setLoginSuccessFlag"
);

const DEFAULT_STATE: GeneralReducerState = {
  signedin: false,
  loginSuccess: false,
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
  localStorage.setItem("accessToken", user.user.ma);
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

general.case(setLoginSuccessFlag, state => ({
  ...state,
  loginSuccess: true
}));

const loggingEpic$ = action$ => {
  return action$.pipe(
    filter(logginAsync.started.match),
    exhaustMap(({ payload: { email, password } }: any) => {
      return from(
        firestore
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

const logginSuccessFlagEpic$ = action$ =>
  action$.pipe(
    filter(logginAsync.done.match),
    delay(2000),
    switchMap(() => of(setLoginSuccessFlag(true)))
  );

const generalEpic = combineEpics(loggingEpic$, logginSuccessFlagEpic$);
export { general, generalEpic };
