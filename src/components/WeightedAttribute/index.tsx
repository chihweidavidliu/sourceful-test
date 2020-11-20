import React, { useState } from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";
import { Card } from "../Card";
import { TextInput } from "../TextInput";
import RangeInput from "../RangeInput";

const WeightedAttributeWrapper = styled(Card)``;

interface IWeightedAttributeAttrs {
  label: string;
  weighting: number;
  updateNode: (updated: Node) => void;
}

export interface IWeightedAttributeProps extends Node {
  data: IWeightedAttributeAttrs;
  selected?: boolean;
  xPos?: number;
  yPos?: number;
}

const WeightedAttribute = (props: IWeightedAttributeProps) => {
  const { data, selected } = props;
  const [label, setLabel] = useState(data.label);
  const { updateNode } = data;

  const handleUpdate = (
    field: "label" | "weighting",
    value: string | number
  ) => {
    const updated: Node = {
      ...props,
      position: { x: props.xPos!, y: props.yPos! }, // reconstitue missing position object
      data: {
        ...data,
        [field]: value,
      },
    };

    updateNode(updated);
  };

  return (
    <WeightedAttributeWrapper isSelected={selected}>
      <TextInput
        className="nodrag"
        type="text"
        placeholder="Enter attribute name"
        value={label}
        name="label"
        maxLength={20}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLabel(e.target.value)
        }
        onBlur={() => handleUpdate("label", label)}
      />

      <RangeInput
        label="Weighting"
        min={0}
        step="0.1"
        max={1}
        name="weighting"
        value={data.weighting}
        onMouseUp={(e) => handleUpdate("weighting", e.currentTarget.value)}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -5, background: "#555" }}
        isConnectable={false}
      />
    </WeightedAttributeWrapper>
  );
};

export default WeightedAttribute;
