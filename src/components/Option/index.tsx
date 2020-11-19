import React from "react";
import styled from "styled-components";
import { Handle, Position, Node, useStoreState } from "react-flow-renderer";
import { Card } from "../Card";
import { CustomNode } from "../../types/CustomNode";
import { TextInput } from "../TextInput";
import RangeInput from "../RangeInput";

const OptionWrapper = styled(Card)``;

const H4 = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
`;

const Score = styled.div`
  font-weight: bold;
  color: teal;
  font-size: 24px;
`;

export interface IOptionData {
  label: string;
  scores: {
    [attributeId: string]: number;
  };
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  setAttributeScore: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface IOptionProps extends Node {
  data: IOptionData;
}

const Option = ({ id, data }: IOptionProps) => {
  const { scores, handleChange, setAttributeScore } = data;

  const nodes = useStoreState((state) => state.nodes);

  const weightedAttributes = nodes.filter(
    (node) => node.type === CustomNode.WEIGHTED_ATTRIBUTE
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
      <TextInput
        className="nodrag"
        type="text"
        placeholder="Enter option name"
        value={data.label}
        name="label"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(id, e)
        }
      />

      <div>
        {weightedAttributes.length ? (
          <>
            {weightedAttributes.map(
              ({ id: attributeId, data: attributeData }) => {
                const score = scores[attributeId] || 0;
                return (
                  <RangeInput
                    label={attributeData.label}
                    key={attributeId}
                    name={attributeId}
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAttributeScore(id, e);
                    }}
                  />
                );
              }
            )}

            <div>
              <H4>Score</H4>
              <Score>{calculateTotalScore()}</Score>
            </div>
          </>
        ) : (
          <div>Please Add Attributes</div>
        )}
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
