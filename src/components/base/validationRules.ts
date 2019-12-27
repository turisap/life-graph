import { SignInFormErrors, CreateEventFromValues } from "../../types";

export const signinValidationRules = values => {
  const errors: SignInFormErrors = {};
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

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

export const createEventValidationRules = (values: CreateEventFromValues) => {
  const errors: Partial<CreateEventFromValues> = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.color) {
    errors.color = "Color is required";
  }
  if (!values.date) {
    errors.date = "Date is required";
  }
};
