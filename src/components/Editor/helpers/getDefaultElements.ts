import { Position } from "react-flow-renderer";
import { CustomNode } from "../../../types/CustomNode";
import { defaultEdgeStyle } from "../../../util/defaultEdgeStyle";

interface IGetDefaultElementsArgs {
  updateNode: (updated: Node) => void;
}

export const getDefaultElements = ({ updateNode }: IGetDefaultElementsArgs) => {
  return [
    {
      id: "2",
      type: CustomNode.WEIGHTED_ATTRIBUTE,
      data: {
        label: "New Attribute",
        updateNode,
        weighting: 1,
      },
      position: { x: 250, y: 50 },
    },
    {
      id: "3",
      type: CustomNode.OPTION,
      data: {
        label: "Option 1",
        updateNode,
        scores: {
          "2": 50,
        },
      },
      position: { x: 100, y: 300 },
      targetPosition: Position.Top,
    },
    {
      id: "4",
      type: CustomNode.OPTION,
      data: {
        label: "Option 2",
        updateNode,
        scores: {
          "2": 50,
        },
      },
      position: { x: 400, y: 300 },
      targetPosition: Position.Top,
    },
    {
      id: "5",
      type: CustomNode.RESULT,
      data: {
        label: "Result",
        scores: {
          "2": 50,
        },
      },
      position: { x: 300, y: 600 },
      targetPosition: Position.Top,
    },
    {
      id: "6",
      source: "2",
      target: "3",
      sourceHandle: "a",
      targetHandle: "a",
      animated: true,
      style: defaultEdgeStyle,
    },
    {
      id: "7",
      source: "2",
      target: "4",
      targetHandle: "a",
      animated: true,
      style: defaultEdgeStyle,
    },
    {
      id: "8",
      source: "3",
      target: "5",
      sourceHandle: "b",
      targetHandle: "a",
      animated: true,
      style: defaultEdgeStyle,
    },
    {
      id: "9",
      source: "4",
      target: "5",
      sourceHandle: "b",
      targetHandle: "a",
      animated: true,
      style: defaultEdgeStyle,
    },
  ];
};
