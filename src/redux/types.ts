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
  user: User;
  authError: string;
}
