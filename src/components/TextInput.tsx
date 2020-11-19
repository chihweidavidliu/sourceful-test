import React, { useRef, HTMLProps } from "react";
import styled from "styled-components";

export const StyledInput = styled.input`
  border: none;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid lightgrey;
  font-weight: bold;
`;

export const TextInput = ({ ...props }: HTMLProps<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const blurOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef?.current?.blur();
    }
  };

  return (
    <StyledInput
      {...props}
      ref={inputRef}
      as={"input"}
      onKeyDown={blurOnEnter}
    />
  );
};
