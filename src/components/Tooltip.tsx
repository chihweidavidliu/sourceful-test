import React, { FunctionComponent } from 'react'
import styled, { css } from "styled-components";
import { Card } from "./Card";
import Portal from "./Portal";

interface ITooltipProps {
    isVisible?: boolean;
    xPos: number;
    yPos: number;
}

export const StyledCard = styled(Card)<ITooltipProps>`  
  max-width: none;
  overflow: visible;
  min-height: 70px;
  max-height: 70px;
  align-items: center;
  position: fixed;
  top: ${({ yPos }) => yPos + 'px'};
  left: ${({ xPos }) => xPos + 'px'};
  z-index: 10;
  display: flex;
  opacity: 0;


  ${({ isVisible }) => isVisible && (
    css`
    animation: fadeIn 0.3s;
    opacity: 1;
    `
  )}


  @keyframes fadeIn {
    from {
      transform: scale(0.2);
      opacity: 0;
    }

    to {
      top: ${({ yPos }) => yPos + 'px'};
      opacity: 1;
    }
  }
`

const Tooltip: FunctionComponent<ITooltipProps> = (props) => {
  return (
    <Portal>
      <StyledCard  {...props}/>
    </Portal>
  )
}


export default Tooltip