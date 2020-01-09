import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ErrorField from "components/base/ErrorField";
import useForm from "components/base/useForm";
import Button from "components/base/Button";

import { signinValidationRules as validationRules } from "../lib/validationRules.ts";
import successIcon from "../../assets/checked.png";
import { logginAsync } from "../redux/ducks/general";
import { RootState } from "../types";

const PageContainer = styled.div`
  background: linear-gradient(#18191a, #40454a);
  padding: 20px;
  opacity: 0.95;
  flex: 1;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: 5rem;

  @media (max-width: 1025px) and (orientation: portrait) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 2rem;
    justify-items: center;
    align-items: start;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 2rem;
    justify-items: center;
    align-items: start;
  }
`;

const StyledHeading = styled.div`
  justify-self: end;
  max-width: 70rem;

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

  @media (max-width: 720px) {
    text-align: center;
    align-self: end;
  }

  @media (max-device-width: 500px) and (orientation: portrait) {
    h1 {
      font-size: 13rem;
    }
    p,
    p.signin__textcaps {
      font-size: 5rem;
    }
  }

  @media (max-width: 1025px) and (orientation: portrait) {
    text-align: center;
    align-self: center;
    justify-self: center;
  }
`;

const StyledForm = styled.form`
  max-width: 42rem;
  height: auto;
  padding: 2rem;
  border-radius: 0.8rem;
  background: ${props => props.theme.whiteBackground};
  opacity: 1;
  justify-self: start;
  display: grid;
  grid-template-rows: 12rem 12rem 1.5rem 8rem 5rem;
  grid-template-columns: 1fr;
  align-items: center;
  button {
    height: 5rem;
  }

  @media (max-width: 1025px) and (orientation: portrait) {
    justify-self: stretch;
    max-width: 100%;
  }

  @media (max-width: 900px) {
    grid-template-rows: 8rem 8rem 1.5rem 8rem 5rem;
  }

  @media (max-width: 720px) {
    justify-self: center;
  }

  @media (max-height: 590px) and (orientation: landscape) {
    grid-template-rows: 8rem 8rem 1.5rem 8rem 5rem;
  }

  @media (max-device-width: 500px) and (orientation: portrait) {
    grid-template-rows: 18rem 18rem 2.5rem 8rem 5rem;
  }
`;

const StyledTinyInfo = styled.p`
  font-size: 1.2rem;
  color: #6a737d;
  align-self: end;

  @media (max-device-width: 500px) and (orientation: portrait) {
    font-size: 2.2rem;
  }
`;

const FormError = styled.p`
  color: #de1e14;
  font-size: 1.4rem;
  font-weight: 300;

  @media (max-device-width: 500px) and (orientation: portrait) {
    font-size: 3rem;
  }
`;

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    signInLoading,
    authError,
    loginSuccess,
    signedin,
    user: { accessToken }
  } = useSelector((state: RootState) => state.general);

  useEffect(() => {
    if (loginSuccess && accessToken) {
      history.push("/");
    }
  }, [loginSuccess, accessToken]);

  const submitCallback = ({ email, password }) => {
    dispatch(logginAsync.started({ email, password }));
  };

  const { errors, values, handleSubmit, handleChange } = useForm({
    submitCallback,
    validationRules
  });

  return (
    <div className="ornament__background">
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
            loadingState={signInLoading}
            height={6}
            onClickHandler={handleSubmit}
            text={signedin ? <img src={successIcon} /> : "Signin"}
          />
          <StyledTinyInfo>
            Actually, you cannot sign in as I have made this app for personal
            use only. You can either try to hack it or run on your local
            machine.
          </StyledTinyInfo>
        </StyledForm>
      </PageContainer>
    </div>
  );
};

export default Signin;
