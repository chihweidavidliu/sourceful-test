import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position, Node } from "react-flow-renderer";

const OptionWrapper = styled.div`
  min-width: 100px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid teal;
`;

interface IOptionData {
  label: string;
  weightings: {
    [attributeId: string]: {
      attributeName: string;
      weighting: number;
    };
  };
  setAttributeScore: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLabelChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

interface IOptionProps extends Node {
  data: IOptionData;
}

const Option = memo(({ id, data }: IOptionProps) => {
  const { weightings } = data;
  console.log("weightings", weightings);
  return (
    <OptionWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />
      <input
        type="text"
        placeholder="Enter option name"
        value={data.label}
        onChange={(e) => data.handleLabelChange(id, e)}
      />

      <div>
        {Object.keys(weightings).map((id) => {
          const attribute = weightings[id];

          return (
            <div key={id}>
              <div>
                {attribute.attributeName} ({attribute.weighting}/100)
              </div>
              <input
                className="nodrag"
                name={id}
                type="range"
                min={0}
                max={100}
                value={attribute.weighting}
                onChange={(e) => data.setAttributeScore(id, e)}
              />
            </div>
          );
        })}
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
