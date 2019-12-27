import { Moment } from "moment";

// redux related

export type User = {
  refreshToken: string | null;
  accessToken: string | null;
};

export interface SignInFireBaseResponseShape {
  user: {
    stsTokenManager: User;
  };
}

export interface RootState {
  general: GeneralReducerState;
}

export interface GeneralReducerState {
  signedin: boolean;
  signInLoading: boolean;
  loginSuccess: boolean;
  user: User;
  authError: string;
}

// forms

export type SignInFormErrors = {
  email?: string;
  password?: string;
};

export type CreateEventFromValues = {
  title: string;
  color: string;
  date: Moment | string;
};
