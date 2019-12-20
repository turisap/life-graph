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
  onChange: (e: any) => void;
};

export type Error = {
  [key: string]: string;
};

type Value = {
  [key: string]: string | number | undefined;
};

const StyledErrorField = styled.div`
  display: grid;
  grid-template-rows: 2.8rem 4rem 1.3rem;
  grid-template-columns: 1fr;

  .error-field__title {
    margin-bottom: 1rem;
    font-weight: 600;
  }

  ._error {
    color: ${props => props.theme.textError};
  }

  input {
    border-radius: 4px;
    border: 1px solid rgb(209, 213, 218);
    padding-left: 8px;

    &:focus {
      outline: none;
    }
  }
`;

const Error = styled.p`
  color: ${props => props.theme.textError};
  font-size: 1.4rem;
  margin-top: 3px;
`;

const ErrorField: React.FC<ErrorFieldProps> = ({
  name,
  title,
  placeholder,
  errors,
  values,
  type,
  onChange
}) => (
  <StyledErrorField>
    <p className={cn("error-field__title", { _error: errors[name] })}>
      {title}
    </p>
    <input
      placeholder={placeholder}
      name={name}
      value={values[name] || ""}
      type={type ? type : "text"}
      onChange={onChange}
      form="novalidatedform"
    />
    <Error>{errors[name]}</Error>
  </StyledErrorField>
);

export default ErrorField;
