import { Position } from "react-flow-renderer";
import { CustomNode } from "../../types/CustomNode";

interface IGetDefaultElementsArgs {
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  setAttributeScore: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const getDefaultElements = ({
  handleChange,
  setAttributeScore,
}: IGetDefaultElementsArgs) => {
  return [
    {
      id: "2",
      type: CustomNode.WEIGHTED_ATTRIBUTE,
      data: {
        label: "New Attribute",
        handleChange,
        weighting: 1,
      },
      style: { border: "1px solid #777", padding: 10 },
      position: { x: 300, y: 50 },
    },
    {
      id: "3",
      type: CustomNode.OPTION,
      data: {
        label: "Option 1",
        handleChange,
        setAttributeScore,
        scores: {
          "2": 50,
        },
      },
      position: { x: 100, y: 400 },
      targetPosition: Position.Top,
    },
    {
      id: "4",
      type: CustomNode.OPTION,
      data: {
        label: "Option 2",
        handleChange,
        setAttributeScore,
        scores: {
          "2": 50,
        },
      },
      position: { x: 400, y: 400 },
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
      position: { x: 300, y: 700 },
      targetPosition: Position.Top,
    },
    {
      id: "6",
      source: "2",
      target: "3",
      sourceHandle: "a",
      targetHandle: "a",
      animated: true,
      style: { stroke: "teal" },
    },
    {
      id: "7",
      source: "2",
      target: "4",
      targetHandle: "a",
      animated: true,
      style: { stroke: "teal" },
    },
    {
      id: "8",
      source: "3",
      target: "5",
      sourceHandle: "b",
      targetHandle: "a",
      animated: true,
      style: { stroke: "teal" },
    },
    {
      id: "9",
      source: "4",
      target: "5",
      sourceHandle: "b",
      targetHandle: "a",
      animated: true,
      style: { stroke: "teal" },
    },
  ];
};
