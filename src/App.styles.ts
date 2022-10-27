import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
    box-sizing: border-box;
    }

    html{
        heigth: 100%;
    }

    body {
        height: 100vh;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        background: linear-gradient(#1e5799, #2989d8);
    }

    

`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: black;
  }

  .score {
    color: black;
    font-size: 2rem;
    margin: 0;
    font-family: "Press Start 2P", sans-serif;
    padding: 2rem
  }

  h1 {
    background-image: linear-gradient(green, white);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-background-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px lightblue);
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
    font-family: "Press Start 2P", sans-serif;
  }

  .start,
  .next {
    cursor: pointer;
    background: darkblue;
    color: white;
    border: 2px solid black;
    box-shadow: 0px 5px 10px rgba(0,0,0, 0.20)
    height: 40px;
    margin: 20px 0;
    paddding: 0 40px
  }

  .start{
    margin-top: 2rem;
    max-width: 200px
    
  }
`;
