import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";

const WeightedAttributeWrapper = styled.div`
  min-width: 120px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
`;

interface IWeightedAttributeData {
  label: string;
  weighting: number;
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IWeightedAttributeProps extends Node {
  data: IWeightedAttributeData;
}

const WeightedAttribute = memo(({ id, data }: IWeightedAttributeProps) => {
  const { handleChange } = data;
  return (
    <WeightedAttributeWrapper>
      <input
        className="nodrag"
        type="text"
        placeholder="Enter attribute name"
        value={data.label}
        name="label"
        onChange={(e) => handleChange(id, e)}
      />
      <div>
        <div>
          Weighting <strong>{data.weighting}</strong>
        </div>
        <input
          className="nodrag"
          type="range"
          min={0}
          step="0.1"
          max={1}
          name="weighting"
          onChange={(e) => handleChange(id, e)}
          value={data.weighting}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -5, background: "#555" }}
      />
    </WeightedAttributeWrapper>
  );
});

export default WeightedAttribute;
