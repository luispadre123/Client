import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import { Container, GlobalStyle, Overlay } from './styles';

const LoginJAPG = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
  };

  return (
    <>
      <GlobalStyle />
      <Overlay />
      <Container>
      <Header isRegister={isRegister}/>
 
      <Body isRegister={isRegister}/>
      <Footer toggleForm={toggleForm} isRegister={isRegister} />
      </Container>
    </>
  );
};

export default LoginJAPG;
