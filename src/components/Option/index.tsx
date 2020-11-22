import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Handle, Position, Node, useStoreState } from "react-flow-renderer";
import { Card } from "../Card";
import { CustomNode } from "../../types/CustomNode";
import { TextInput } from "../TextInput";
import RangeInput from "../RangeInput";
import Tooltip from "../Tooltip";

const OptionWrapper = styled(Card)``;

const H4 = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
`;

const Score = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.darkAccentColour};
  font-size: 24px;
`;

export interface IOptionAttrs {
  label: string;
  scores: {
    [attributeId: string]: number;
  };
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  setAttributeScore: (id: string, attributeId: string, value: number) => void;
}

export interface IOptionProps extends Node {
  data: IOptionAttrs;
  selected?: boolean;
}

const Option = ({ id, data, selected }: IOptionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    <>
    <Tooltip isVisible={isHovered && data.label.length > 23}>{data.label}</Tooltip>
    <OptionWrapper isSelected={selected} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} ref={wrapperRef}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
        isConnectable={false}
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
                    min={0}
                    max={100}
                    value={score}
                    onChange={(value: number) => {
                      setAttributeScore(id, attributeId, value);
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
        isConnectable={false}
      />
    </OptionWrapper>
    </>
  );
};

export default Option;
