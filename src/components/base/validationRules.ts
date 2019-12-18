type SignInFormErrors = {
  email?: string;
  password?: string;
};

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
