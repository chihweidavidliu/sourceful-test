import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";

const ResultWrapper = styled.div`
  min-width: 120px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid lightgrey;
`;

interface IResultData {
  label: string;
}

interface IResultProps extends Node {
  data: IResultData;
}

const Result = memo(({ id, data }: IResultProps) => {
  return (
    <ResultWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />
      <div>Result</div>
    </ResultWrapper>
  );
});

export default Result;
