import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";

const WeightingInputWrapper = styled.div`
  min-width: 120px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
`;

interface IWeightingInputData {
  label: string;
  weighting: number;
  handleWeightingChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLabelChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

interface IWeightingInputProps extends Node {
  data: IWeightingInputData;
}

const WeightingInput = memo(({ id, data }: IWeightingInputProps) => {
  return (
    <WeightingInputWrapper>
      <input
        className="nodrag"
        type="text"
        placeholder="Enter attribute name"
        value={data.label}
        onChange={(e) => data.handleLabelChange(id, e)}
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
          onChange={(e) => data.handleWeightingChange(id, e)}
          value={data.weighting}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -5, background: "#555" }}
      />
    </WeightingInputWrapper>
  );
});

export default WeightingInput;
