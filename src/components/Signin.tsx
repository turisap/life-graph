import React from "react";
import styled from "styled-components";

import ErrorField from "components/base/ErrorField";
import useForm from "components/base/useForm";
import { signinValidationRules as validationRules } from "components/base/validationRules.ts";

const BackgrounPattern = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  background: linear-gradient(#18191a, #40454a);
  opacity: 0.95;
  flex: 1;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: 5rem;
`;

const StyledHeading = styled.div`
  justify-self: end;
  width: 70rem;

  h1 {
    color: rgb(255, 255, 255);
    font-size: 6.4rem;
    margin-bottom: 20px;
    font-weight: 400;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 20px;
    font-weight: 300;
  }
  p.signin__textcaps {
    text-transform: uppercase;
    margin-top: 0.8rem;
  }
`;

const StyledForm = styled.form`
  width: 42rem;
  height: 50rem;
  padding: 2rem;
  border-radius: 0.8rem;
  background: #ffffff;
  opacity: 1;
  grid-column: 2 / 3;
  justify-self: start;
  display: grid;
  grid-template-rows: 12rem 12rem 15rem;
  grid-template-columns: 1fr;
  align-items: center;
`;

const Signin = () => {
  const submitCallback = () => {};
  const { errors, values, handleSubmit, handleChange } = useForm({
    submitCallback,
    validationRules
  });

  return (
    <BackgrounPattern className="signin__background">
      <PageContainer>
        <StyledHeading>
          <h1>Built for fun</h1>
          <p>
            This is my life journal in a chart form / calendar / a mean to track
            my life path / a nice thing which accumulates everything has
            happened to me in a nice graphic way / another task I set for myself
          </p>
          <p className="signin__textcaps">
            everything is in a nice small bottle
          </p>
        </StyledHeading>
        <StyledForm>
          <ErrorField
            name="email"
            title="Your email"
            placeholder="Your email"
            errors={errors}
            values={values}
            type="email"
          />
          <ErrorField
            name="password"
            title="Your password"
            placeholder="**************"
            errors={errors}
            values={values}
            type="password"
          />
        </StyledForm>
      </PageContainer>
    </BackgrounPattern>
  );
};

export default Signin;
