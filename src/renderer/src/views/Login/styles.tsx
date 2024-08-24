import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: #1f242c;
    color: #fff;
    display: grid;
    place-items: center;
    height: 100vh;
    overflow: hidden;
  }
`;

const Overlay = styled.div`
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 36, 44, 0.8);
`;

const Container = styled.div`
  grid-area: 1 / 1;
  background-color: #2c333b;
  border-radius: 0;
  padding: 30px;
  width: 100vw;
  max-width: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
height: 92vh;
  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

export{
  Container,Overlay,GlobalStyle
}