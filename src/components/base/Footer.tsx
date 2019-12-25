import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  background: black;

  & > a {
    flex: 1 1 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 1.4rem;
    font-weight: 700;
  }

  &:hover {
    color: hsla(0, 0%, 100%, 0.7);
  }
  code {
    margin-left: 10px;
  }
`;

const Footer = () => (
  <StyledFooter>
    <a href="https://github.com/turisap" target="blank">
      Created by <code> turisap</code>
    </a>
  </StyledFooter>
);

export default Footer;
