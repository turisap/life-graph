import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  display: flex;
  background: black;
  min-height: 4rem;

  & > a {
    flex: 1 1 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 1.4rem;
    font-weight: 700;

    &:hover {
      color: hsla(0, 0%, 100%, 0.7);
    }
  }

  & > a:not(.home) {
    border-left: 1px solid rgba(84, 82, 82, 0.7);
  }

  .home {
    border-right: 1px solid rgba(84, 82, 82, 0.7);
  }

  .separator {
    flex-grow: 100;
    flex-shrink: 100;
  }
`;

const NavBar = () => {
  return (
    <StyledNav>
      <Link to="/" className="home">
        <span>Home</span>
      </Link>
      <div className="separator"></div>
      {true && (
        <Link to="/signin">
          <span>Sign In</span>
        </Link>
      )}
      {true && (
        <>
          <Link to="/create-event">
            <span>Create</span>
          </Link>
          <Link to="#">
            <span>Sign Out</span>
          </Link>
        </>
      )}
    </StyledNav>
  );
};

export default NavBar;
