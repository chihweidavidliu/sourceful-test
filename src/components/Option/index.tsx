import React, { useState } from "react";
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
  color: ${({ theme }) => theme.darkAccentColour};
  font-size: 24px;
`;

export interface IOptionAttrs {
  label: string;
  scores: {
    [attributeId: string]: number;
  };
  updateNode: (updated: Node) => void;
}

export interface IOptionProps extends Node {
  data: IOptionAttrs;
  selected?: boolean;
  xPos?: number;
  yPos?: number;
}

const Option = (props: IOptionProps) => {
  const { data, selected } = props;
  const { scores, updateNode } = data;
  const [label, setLabel] = useState(data.label);

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

  const handleUpdate = (field: "label" | "score", value: string | number) => {
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

  const handleScoreUpdate = (attributeId: string, score: number) => {
    const updated: Node = {
      ...props,
      position: { x: props.xPos!, y: props.yPos! }, // reconstitue missing position object
      data: {
        ...data,
        scores: {
          ...data.scores,
          [attributeId]: score,
        },
      },
    };

    updateNode(updated);
  };

  return (
    <OptionWrapper isSelected={selected}>
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
        value={label}
        name="label"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLabel(e.target.value)
        }
        onBlur={() => handleUpdate("label", label)}
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
                    onMouseUp={(e) =>
                      handleScoreUpdate(
                        attributeId,
                        Number(e.currentTarget.value)
                      )
                    }
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
  );
};

export default Option;
