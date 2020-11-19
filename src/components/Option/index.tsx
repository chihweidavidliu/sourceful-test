import React from "react";
import styled from "styled-components";
import { Handle, Position, Node, useStoreState } from "react-flow-renderer";

const OptionWrapper = styled.div`
  min-width: 100px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid teal;
`;

export interface IOptionData {
  label: string;
  scores: {
    [attributeId: string]: number;
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

const Option = ({ id, data }: IOptionProps) => {
  const { scores } = data;

  const nodes = useStoreState((state) => state.nodes);

  const weightedAttributes = nodes.filter(
    (node) => node.type === "weightingInput"
  );

  const calculateTotalScore = () => {
    const total = weightedAttributes.reduce((total, attribute) => {
      const score = scores[attribute.id] || 0;
      const subscore = attribute.data.weighting * score;
      return total + subscore;
    }, 0);

    return total.toFixed(1);
  };

  return (
    <OptionWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />
      <input
        className="nodrag"
        type="text"
        placeholder="Enter option name"
        value={data.label}
        onChange={(e) => data.handleLabelChange(id, e)}
      />

      <div>
        {weightedAttributes.map(({ id: attributeId, data: attributeData }) => {
          const score = scores[attributeId] || 0;
          return (
            <div key={attributeId}>
              <div>
                {attributeData.label} ({score}/100)
              </div>
              <input
                className="nodrag"
                name={attributeId}
                type="range"
                min={0}
                max={100}
                value={score}
                onChange={(e) => {
                  data.setAttributeScore(id, e);
                }}
              />
            </div>
          );
        })}
      </div>

      <div>
        <h4>Score</h4>
        {calculateTotalScore()}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ bottom: -5, background: "#555" }}
      />
    </OptionWrapper>
  );
};

export default Option;
