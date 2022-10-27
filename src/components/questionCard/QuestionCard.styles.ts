import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1100px;
  background: #ebfefe;
  border-radius: 10px;
  border: 2px solod #0080a2;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  p {
    font-size: 1rem;
  }

  img {
    max-width: 400px;
    max-height: 400px;
    border: 1px solid black;
  }
  h3 {
    text-align: center;
  }
`;

type ButtonWrapperOptions = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperOptions>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    width: 100%;
    heigth: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
      correct ? "green" : !correct && userClicked ? "red" : "lightblue"};
    border: 3px solid white;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: black;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
