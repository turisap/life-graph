import { useEffect, useState } from "react";
import { Error } from "./ErrorField";

type UseFormProps = {
  submitCallback: (values: any) => void;
  validationRules: (values: any) => any;
  defaults?: [];
};

const useForm = ({
  submitCallback,
  validationRules,
  defaults
}: UseFormProps) => {
  const [values, setValues] = useState<any>({ ...defaults });
  const [errors, setErrors] = useState<Error>({});
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dirty) {
      submitCallback(values);
    }
  }, [errors]);

  const handleSubmit = e => {
    if (e) e.preventDefault();
    setErrors(validationRules(values));
    setDirty(true);
  };

  const handleChange = e => {
    e.persist();
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useForm;
