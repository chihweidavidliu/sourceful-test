import React from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";
import { Card } from "../Card";
import { TextInput } from "../TextInput";
import RangeInput from "../RangeInput";

const WeightedAttributeWrapper = styled(Card)``;

interface IWeightedAttributeData {
  label: string;
  weighting: number;
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IWeightedAttributeProps extends Node {
  data: IWeightedAttributeData;
  selected?: boolean;
}

const WeightedAttribute = ({ id, data, selected }: IWeightedAttributeProps) => {
  const { handleChange } = data;
  return (
    <WeightedAttributeWrapper isSelected={selected}>
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
        step="0.1"
        max={1}
        name="weighting"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(id, e)
        }
        value={data.weighting}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -5, background: "#555" }}
      />
    </WeightedAttributeWrapper>
  );
};

export default WeightedAttribute;
