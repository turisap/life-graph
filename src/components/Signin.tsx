import React from "react";
import styled from "styled-components";

const BackgrounPattern = styled.div`
  /* background: url(../../assets/signin-background.jpg) repeat; */
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  /* background: linear-gradient(#18191a, #40454a); */
  opacity: 0.9;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.div`
  width: 420px;
  height: 503px;
  border-radius: 8px;
  background: rgb(250, 251, 252);
`;

const Signin = () => {
  return (
    <BackgrounPattern className="signin__background">
      <PageContainer>
        <StyledForm></StyledForm>
      </PageContainer>
    </BackgrounPattern>
  );
};

export default Signin;
