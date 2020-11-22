import styled from "styled-components";

export const Card = styled.div<{ isSelected?: boolean }>`
  background: white;
  min-width: 250px;
  padding: 15px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.darkAccentColour : "lightgrey"};
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;
