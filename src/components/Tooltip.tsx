import React, { FunctionComponent, useRef } from 'react'
import styled, { css } from "styled-components";
import { Card } from "./Card";

interface ITooltipProps {
  isVisible?: boolean;
}

interface IStyledCardProps {
  isVisible?: boolean;
  position?: string;
  left: number;
}

export const StyledCard = styled(Card)<IStyledCardProps>`  
  max-width: none;
  overflow: visible;
  min-height: 70px;
  max-height: 70px;
  align-items: center;
  position: fixed;
  ${props => {
    switch (props.position) {
      case 'bottom':
        
        return css`bottom: -90px;`
    
      default:
        return css`top: -90px;`
    }
  }}

  left: ${props => props.left + 'px'};
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
      opacity: 1;
    }
  }
`

const Tooltip: FunctionComponent<ITooltipProps> = (props) => {
  const editorPane = document.querySelector(".react-flow__pane");
  const editorRect = editorPane?.getBoundingClientRect();

  const ref = useRef<HTMLDivElement>(null);
  const rect = ref?.current?.getBoundingClientRect();

    // if the tooltip box is higher up than the editor frame then the tooltip needs to appear at the bottom
  const position = (rect?.y || 0) < (editorRect?.y || 0 ) ? 'bottom' : 'top';

  return (
      <StyledCard  {...props} left={0} position={position}  ref={ref} />

  )
}


export default Tooltip