type SignInFormErrors = {
  email?: string;
  password?: string;
};

export const signinValidationRules = values => {
  const errors: SignInFormErrors = {};
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!values.email) {
    errors.email = "Email is a required field";
  }
  if (!emailRegex.test(values.email)) {
    errors.email = "Email should be of valid format";
  }
  return errors;
};
