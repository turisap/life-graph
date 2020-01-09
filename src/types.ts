// redux related

export interface RootState {
  general: GeneralReducerState;
}

export interface GeneralReducerState {}

// forms
export type SignInFormErrors = {
  email?: string;
  password?: string;
};
