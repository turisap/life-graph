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
  onClickHandler?: (e: any) => void;
};

type ErrorFieldWrapperProps = Pick<
  ErrorFieldProps,
  "name" | "errors" | "title" | "onClickHandler"
> & { render: any };

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
  margin-top: 17px;

  .error-field__title {
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p._error {
    color: ${props => props.theme.textError};
  }

  input._error {
    border: 1px solid ${props => props.theme.textError};
  }

  .input-real,
  .error-wrapper__fake-input {
    border-radius: 4px;
    border: 1px solid rgb(209, 213, 218);
    padding-left: 8px;

    &:focus {
      outline: none;
    }
  }

  .error-wrapper__fake-input._error {
    border: 1px solid ${props => props.theme.textError};
  }

  @media (max-device-width: 500px) and (orientation: portrait) {
    grid-template-rows: 6rem 9rem 1.3rem;
    font-size: 4rem;
  }
`;

const Error = styled.p`
  color: ${props => props.theme.textError};
  font-size: 1.4rem;
  margin-top: 3px;

  @media (max-device-width: 500px) and (orientation: portrait) {
    font-size: 3rem;
  }
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
      className={cn("input-real", { _error: errors[name] })}
    />
    <Error>{errors[name]}</Error>
  </StyledErrorField>
);

const ErrorFieldWrapper: React.FC<ErrorFieldWrapperProps> = props => (
  <StyledErrorField>
    <p
      className={cn("error-field__title", { _error: props.errors[props.name] })}
    >
      {props.title}
    </p>
    <div
      className={cn("error-wrapper__fake-input", {
        _error: props.errors[props.name]
      })}
      onClick={props.onClickHandler}
    >
      {props.render(props)}
    </div>
    <Error>{props.errors[props.name]}</Error>
  </StyledErrorField>
);

export default ErrorField;
export { ErrorFieldWrapper };
