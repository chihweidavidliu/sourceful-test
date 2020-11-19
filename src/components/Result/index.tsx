import React, { memo } from "react";
import styled from "styled-components";
import { Handle, Position, Node, useStoreState } from "react-flow-renderer";
import { IOptionData } from "../Option";
import { CustomNode } from "../../types/CustomNode";

const ResultWrapper = styled.div`
  min-width: 120px;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid lightgrey;
`;

interface ISortedNodes {
  weightedAttributes: Node[];
  options: Node[];
}

interface IResultData {
  label: string;
}

interface IResultProps extends Node {
  data: IResultData;
}

const Result = memo(({ id, data }: IResultProps) => {
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

  console.log("sorted nodes", sortedNodes);

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

  const calculateTotalScore = (optionData: IOptionData) => {
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
      return;
    }

    return (
      <div>
        {winner.topOptions.length > 1 ? "Draw" : "Winner"}
        <div>
          {winner.topOptions.map((option) => (
            <div key={option}>{option}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ResultWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />
      {renderResult()}
    </ResultWrapper>
  );
});

export default Result;
