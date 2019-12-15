import React from "react";
import styled from "styled-components";
import cn from "class-names";

type ErrorFieldProps = {
  name: string;
  title: string;
  placeholder: string;
  errors: Error;
  values: Value;
  type?: string;
};

export type Error = {
  [key: string]: string;
};

type Value = {
  [key: string]: string | number | undefined;
};

const StyledErrorField = styled.div`
  display: grid;
  grid-template-rows: 1.8rem 4rem 1.3rem;
  grid-template-columns: 1fr;
`;

const ErrorField: React.FC<ErrorFieldProps> = ({
  name,
  title,
  placeholder,
  errors,
  values,
  type
}) => (
  <StyledErrorField>
    <p className={cn("error-field__title", { _error: errors[name] })}>
      {!!errors[name] && title}
    </p>
    <input
      placeholder={placeholder}
      name={name}
      value={values[name]}
      type={type ? type : "text"}
    />
    <p>{!!errors[name] && errors[name]}</p>
  </StyledErrorField>
);

export default ErrorField;
