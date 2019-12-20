import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";
import { darken } from "polished";

type ButtonProps = {
  height?: number;
  width?: number;
  color?: string;
  background: string;
  text: string;
  loadingState: boolean;
  onClick: (values: any) => void;
};

const StyledButton = styled.button<ButtonProps>`
  width: ${props => props.width + "rem" || "100%"};
  height: ${props => props.height + "rem" || "100%"};
  background: ${props => props.background || "#ffffff"};
  color: ${props => props.color || props.theme.color};

  border: none;
  outline: none;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-size: 2rem;

  &:hover {
    background: ${props =>
      props.background
        ? darken(0.1, props.background)
        : darken(0.1, "#ffffff")};
    cursor: pointer;
    transition: background 0.5s ease;
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
