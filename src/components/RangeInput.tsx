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


const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
`

interface IRangeInputProps extends SliderProps {
  label: string;
}

const RangeInput = ({ label, ...props }: IRangeInputProps) => {
  return (
    <RangeInputWrapper className="nodrag">
      <LabelWrapper>
        <Label>{label}:</Label> <strong>{props.value}</strong>
      </LabelWrapper>
      <Slider
        {...props}
        trackStyle={{ background: "#EF4158" }}
        handleStyle={{ border: "2px solid #EF4158" }}
      />
    </RangeInputWrapper>
  );
};

export default RangeInput;
