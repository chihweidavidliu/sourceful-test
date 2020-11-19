import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position } from "react-flow-renderer";

const WeightingInputWrapper = styled.div`
  min-width: 100px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
`;

interface IWeightingInputData {
  label: string;
  weighting: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IWeightingInputProps {
  data: IWeightingInputData;
}

const WeightingInput = memo(({ data }: IWeightingInputProps) => {
  return (
    <WeightingInputWrapper>
      <input type="text" placeholder="Enter attribute name" />
      <div>
        <div>
          Attribute Weighting <strong>{data.weighting}</strong>
        </div>
        <input
          className="nodrag"
          type="range"
          min={0}
          max={10}
          onChange={data.onChange}
          defaultValue={0}
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
