import React from "react";
import styled from "styled-components";
import { Handle, Position, Node, useStoreState } from "react-flow-renderer";
import { IOptionAttrs } from "../Option";
import { CustomNode } from "../../types/CustomNode";
import { Card } from "../Card";

const ResultWrapper = styled(Card)`
  padding: 20px;
`;

const Label = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.lightAccentColour};
`;

const Winner = styled.div`
  font-size: 30px;
  color: ${({ theme }) => theme.darkAccentColour};
  font-weight: bold;
`;

interface ISortedNodes {
  weightedAttributes: Node[];
  options: Node[];
}

interface IResultAttrs {
  label: string;
}

interface IResultProps extends Node {
  data: IResultAttrs;
  selected?: boolean;
}

const Result = ({ selected }: IResultProps) => {
  const sortedNodes = useStoreState((state) =>
    state.nodes.reduce(
      (result: ISortedNodes, node: Node) => {
        switch (node.type) {
          case CustomNode.OPTION:
            result.options.push(node);
            return result;
          case CustomNode.WEIGHTED_ATTRIBUTE:
            result.weightedAttributes.push(node);
            return result;
          default:
            return result;
        }
      },
      {
        weightedAttributes: [],
        options: [],
      }
    )
  );

  const calculateWinner = (): {
    topOptions: string[];
    score: number;
  } | null => {
    let winner: { topOptions: string[]; score: number } | null = null;

    sortedNodes.options.forEach((option) => {
      const score = calculateTotalScore(option.data);

      if (!winner || winner?.score < score) {
        winner = { topOptions: [option.data.label], score };
      } else if (winner?.score === score) {
        winner.topOptions.push(option.data.label);
      }
    });

    return winner;
  };

  const calculateTotalScore = (optionData: IOptionAttrs) => {
    const { scores } = optionData;

    const total = sortedNodes.weightedAttributes.reduce((total, attribute) => {
      const score = scores[attribute.id] || 0;
      const subscore = attribute.data.weighting * score;
      return total + subscore;
    }, 0);

    return total;
  };

  const winner = calculateWinner();

  const renderResult = () => {
    if (!winner) {
      return <div>Insufficient Data</div>;
    }

    return (
      <>
        <Label>{winner.topOptions.length > 1 ? "Draw" : "Winner"}</Label>
        <div>
          {winner.topOptions.map((option) => (
            <Winner key={option}>{option}</Winner>
          ))}
        </div>
      </>
    );
  };

  return (
    <ResultWrapper isSelected={selected}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
        isConnectable={false}
      />
      {renderResult()}
    </ResultWrapper>
  );
};

export default Result;
