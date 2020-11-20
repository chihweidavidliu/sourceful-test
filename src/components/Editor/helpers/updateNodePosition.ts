import { Node, XYPosition } from "react-flow-renderer";

export const updateNodePosition = (
  node: Node,
  newPosition: Partial<XYPosition>
) => {
  return {
    ...node,
    position: {
      ...node.position,
      ...newPosition,
    },
  };
};
