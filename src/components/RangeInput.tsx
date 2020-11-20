import React from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import { SliderProps } from "rc-slider/lib/Slider";
import "rc-slider/assets/index.css";

const RangeInputWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-gap: 6px;
  cursor: default;
`;

interface IRangeInputProps extends SliderProps {
  label: string;
}

const RangeInput = ({ label, ...props }: IRangeInputProps) => {
  return (
    <RangeInputWrapper className="nodrag">
      <div>
        {label}: <strong>{props.value}</strong>
      </div>
      <Slider
        {...props}
        trackStyle={{ background: "#EF4158" }}
        handleStyle={{ border: "2px solid #EF4158" }}
      />
    </RangeInputWrapper>
  );
};

export default RangeInput;
