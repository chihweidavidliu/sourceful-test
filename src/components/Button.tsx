import styled from "styled-components";

export const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  font-size: 14px;
  padding: 0px 9px;
  background: white;
  border: 0;
  border: 2px solid white;
  cursor: pointer;
  border-radius: 50px;
  background: transparent;
  color: white;
  opacity: 0.8;
  font-weight: bold;

  &:hover,
  &:focus {
    outline: none;
    opacity: 1;
    background: white;
    color: #ef4158;
  }
  &:focus {
    box-shadow: 0px 2px 6px rgb(6, 22, 22, 0.5);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-shrink: 0;
  min-height: 40px;
  width: 220px;
  justify-content: space-between;
  margin: 0 auto;
`;
