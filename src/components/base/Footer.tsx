import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  background: black;
  justify-content: flex-start;

  & > a {
    flex: 0 1 18rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 1.4rem;
    font-weight: 400;
    margin-left: 2rem;
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
      Made by <code>&#123; turisap &#125;</code>
    </a>
  </StyledFooter>
);

export default Footer;
