import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ErrorField from "components/base/ErrorField";
import useForm from "components/base/useForm";
import Button from "components/base/Button";
import { signinValidationRules as validationRules } from "components/base/validationRules.ts";

import { logginAsync } from "../redux/ducks/general";
import { RootState } from "../redux/types";

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
  height: auto;
  padding: 2rem;
  border-radius: 0.8rem;
  background: #ffffff;
  opacity: 1;
  grid-column: 2 / 3;
  justify-self: start;
  display: grid;
  grid-template-rows: 12rem 12rem 1.5rem 8rem 5rem;
  grid-template-columns: 1fr;
  align-items: center;
`;

const StyledTinyInfo = styled.p`
  font-size: 12px;
  color: #6a737d;
  align-self: end;
`;

const FormError = styled.p`
  color: #de1e14;
  font-size: 14px;
  font-weight: 300;
`;

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    signInLoading,
    authError,
    signedin,
    user: { accessToken }
  } = useSelector((state: RootState) => state.general);

  useEffect(() => {
    if (signedin && accessToken) {
      history.push("/");
    }
  }, [signedin, accessToken]);

  const submitCallback = ({ email, password }) => {
    dispatch(logginAsync.started({ email, password }));
  };

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
        <StyledForm onSubmit={handleSubmit}>
          <ErrorField
            name="email"
            title="Your email"
            placeholder="Your email"
            errors={errors}
            values={values}
            type="email"
            onChange={handleChange}
          />
          <ErrorField
            name="password"
            title="Your password"
            placeholder="**************"
            errors={errors}
            values={values}
            type="password"
            onChange={handleChange}
          />
          <FormError>{authError}</FormError>
          <Button
            text="Signin"
            loadingState={signInLoading}
            background="#2ebc4f"
            color="#fff"
            height={6}
            onClick={handleSubmit}
          />
          <StyledTinyInfo>
            Actually, you cannot sign in as I have made this app for personal
            use only. You can either try to hack it or run on your local
            machine.
          </StyledTinyInfo>
        </StyledForm>
      </PageContainer>
    </BackgrounPattern>
  );
};

export default Signin;
