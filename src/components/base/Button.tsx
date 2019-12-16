import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";

type ButtonProps = {
  height?: number;
  width?: number;
  color?: string;
  background: string;
  text: string;
  loading: boolean;
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
`;

const Button: React.FC<ButtonProps> = props => {
  return (
    <StyledButton {...props}>
      {props.loading ? (
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
