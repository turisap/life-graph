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
  events: EventReducerState;
}

export interface GeneralReducerState {
  signedin: boolean;
  signInLoading: boolean;
  loginSuccess: boolean;
  user: User;
  authError: string;
}

export type Event = {
  eventDate: Moment | string;
  eventColor: string;
  eventTitle: string;
};

export type EventRange = {
  rangeTitle: string;
  rangeColor: string;
  startDate: Moment | string;
  endDate: Moment | string;
};

export type EventReducerState = {
  events: Event[];
  eventRanges: EventRange[];
};

// forms
export type SignInFormErrors = {
  email?: string;
  password?: string;
};

// backend responses
export type EventResponse = Event & { data: () => any };
