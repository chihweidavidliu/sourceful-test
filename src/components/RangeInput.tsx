import React, { HTMLProps } from "react";
import styled from "styled-components";

const RangeInputWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-gap: 6px;
  cursor: default;
`;

interface IRangeInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const RangeInput = ({ label, ...props }: IRangeInputProps) => {
  return (
    <RangeInputWrapper className="nodrag">
      <div>
        {label}: <strong>{props.value}</strong>
      </div>
      <input {...props} type="range" />
    </RangeInputWrapper>
  );
};

export default RangeInput;
