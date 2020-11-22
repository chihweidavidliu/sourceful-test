import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";
import { Card } from "../Card";
import { TextInput } from "../TextInput";
import RangeInput from "../RangeInput";
import  Tooltip  from "../Tooltip";

const WeightedAttributeWrapper = styled(Card)``;

interface IWeightedAttributeAttrs {
  label: string;
  weighting: number;
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  setAttributeWeighting: (id: string, weighting: number) => void;
}

export interface IWeightedAttributeProps extends Node {
  data: IWeightedAttributeAttrs;
  selected?: boolean;
}

const WeightedAttribute = ({ id, data, selected }: IWeightedAttributeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { handleChange, setAttributeWeighting } = data;

  return (
    <>
    <Tooltip isVisible={isHovered && data.label.length > 23}>{data.label}</Tooltip>
    <WeightedAttributeWrapper isSelected={selected} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} ref={wrapperRef}>
      <TextInput
        className="nodrag"
        type="text"
        placeholder="Enter attribute name"
        value={data.label}
        name="label"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(id, e)
        }
      />

      <RangeInput
        label="Weighting"
        min={0}
        step={0.1}
        max={1}
        onChange={(value: number) => {
          setAttributeWeighting(id, value);
        }}
        value={data.weighting}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -5, background: "#555" }}
        isConnectable={false}
      />
    </WeightedAttributeWrapper>
    </>
  );
};

export default WeightedAttribute;
