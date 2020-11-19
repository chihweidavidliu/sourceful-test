import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position } from "react-flow-renderer";

const OptionWrapper = styled.div`
  min-width: 100px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid teal;
`;

interface IOptionData {
  label: string;
}

interface IOptionProps {
  data: IOptionData;
}

const Option = memo(({ data }: IOptionProps) => {
  return (
    <OptionWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />
      <input type="text" placeholder="Enter option name" />
      <div>
        <div>{data.label}</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ bottom: -5, background: "#555" }}
      />
    </OptionWrapper>
  );
});

export default Option;
