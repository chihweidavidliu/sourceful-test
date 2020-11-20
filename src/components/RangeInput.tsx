import React, { MouseEvent, useState } from "react";
import styled from "styled-components";

const RangeInputWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-gap: 6px;
  cursor: default;
`;

interface IRangeInputProps {
  label: string;
  value: number;
  onMouseUp: (event: MouseEvent<HTMLInputElement>) => void;
  name: string;
  min: number;
  max: number;
  step?: string;
}

const RangeInput = ({ label, onMouseUp, ...props }: IRangeInputProps) => {
  const [score, setScore] = useState(props.value);

  return (
    <RangeInputWrapper className="nodrag">
      <div>
        {label}: <strong>{props.value}</strong>
      </div>
      <input
        {...props}
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        onMouseUp={onMouseUp}
        type="range"
      />
    </RangeInputWrapper>
  );
};

export default RangeInput;
