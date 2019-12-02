import React from "react";
import styled from "styled-components";

const Styled404 = styled.div`
  width: 100%;
  height 100%;
  display: flex;
  align-items:start;
  justify-content: center;
  color: #454545;
  font-size: 18px;
  margin-top:20px

  .panel {
    width: 750px;
    height 500px;
    border: 1px solid rgb(209, 213, 218);
    border-radius: 5px;
    font-weight: 600;
    display: flex;
    justify-content:center;
    align-items: center;

    span {
      font-style:italic;
    }
  }
`;

const NotFound = () => (
  <Styled404>
    <div className="panel">
      <p>
        Page you are looking for does not exist [ <span>yet</span> ]
      </p>
    </div>
  </Styled404>
);

export default NotFound;
