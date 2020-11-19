import React, { HTMLProps } from "react";
import styled from "styled-components";

const RangeInputWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-gap: 6px;
`;

interface IRangeInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const RangeInput = ({ label, ...props }: IRangeInputProps) => {
  return (
    <RangeInputWrapper>
      <div>
        {label}: <strong>{props.value}</strong>
      </div>
      <input {...props} className="nodrag" type="range" />
    </RangeInputWrapper>
  );
};

export default RangeInput;
