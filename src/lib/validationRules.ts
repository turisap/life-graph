import { SignInFormErrors, Event, EventRange } from "../types";

const hexColorCodeRegex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const signinValidationRules = values => {
  const errors: SignInFormErrors = {};

  if (!emailRegex.test(values.email)) {
    errors.email = "Email should be of valid format";
  }
  if (!values.email) {
    errors.email = "Email is a required field";
  }
  if (!values.password) {
    errors.password = "Password is a required field";
  }
  return errors;
};

export const createEventValidationRules = (values: Event) => {
  const errors: Partial<Event> = {};

  if (!values.eventTitle) {
    errors.eventTitle = "Title is required";
  }
  if (!hexColorCodeRegex.test(values.eventColor)) {
    errors.eventColor = "Color should be in hex-code form";
  }
  if (!values.eventColor) {
    errors.eventColor = "Color is required";
  }
  if (!values.eventDate) {
    errors.eventDate = "Date is required";
  }
  return errors;
};

export const createRangeValidationRules = (values: EventRange) => {
  const errors: Partial<EventRange> = {};

  if (!values.rangeTitle) {
    errors.rangeTitle = "Title is required";
  }
  if (!hexColorCodeRegex.test(values.rangeColor)) {
    errors.rangeColor = "Color should be in hex-code form";
  }
  if (!values.rangeColor) {
    errors.rangeColor = "Color is required";
  }
  if (!values.startDate) {
    errors.startDate = "Start date is required";
  }

  return errors;
};
