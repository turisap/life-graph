import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";
import { darken, lighten } from "polished";

type ButtonProps = {
  height?: number;
  width?: number;
  text: string | JSX.Element;
  fontSize?: number;
  color?: string;
  background?: string;
  loadingState: boolean;
  onClick: (values: any) => void;
};

const StyledButton = styled.button<ButtonProps>`
  width: ${props => props.width + "rem" || "100%"};
  height: ${props => props.height + "rem" || "100%"};
  background: ${props => props.background || props.theme.greenBackground};
  color: ${props => props.color || props.theme.buttonColor};

  border: none;
  outline: none;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-size: ${props => (props.fontSize ? props.fontSize + "rem" : "2rem")};
  box-shadow: 0px 2px 4px 1px ${lighten(0.3, "#2ebc4f")};

  &:hover {
    background: ${props =>
      props.background
        ? darken(0.1, props.background)
        : darken(0.1, "#2ebc4f")};
    cursor: pointer;
    transition: background 0.5s ease;
  }

  img {
    height: ${props => props.height * 0.6 + "rem"};
  }

  @media (max-device-width: 500px) and (orientation: portrait) {
    font-size: 3rem;
  }
`;

const Button: React.FC<ButtonProps> = props => {
  return (
    <StyledButton {...props}>
      {props.loadingState ? (
        <Spinner
          size={props.height ? props.height * 6 : 40}
          spinnerColor={props.color ? props.color : "#333"}
          spinnerWidth={2}
          visible={true}
        />
      ) : (
        props.text
      )}
    </StyledButton>
  );
};

export default Button;
