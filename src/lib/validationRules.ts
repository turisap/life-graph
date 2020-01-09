import { SignInFormErrors } from "../types";

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const signinValidationRules = values => {
  const errors: SignInFormErrors = {};
  if (values.example.test(emailRegex)) {
    errors.email = "Example";
  }
  return errors;
};
