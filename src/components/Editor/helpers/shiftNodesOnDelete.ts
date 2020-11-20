import omit from "lodash.omit";
import { Elements, Node } from "react-flow-renderer";
import { CustomNode } from "../../../types/CustomNode";
import { updateNodePosition } from "./updateNodePosition";

export const shiftNodesOnDelete = (
  elements: Elements,
  indexOfDeletedNode: number,
  deletedNodeType: CustomNode
) => {
  const nodeToRemove = elements[indexOfDeletedNode];

  switch (deletedNodeType) {
    case CustomNode.WEIGHTED_ATTRIBUTE:
      return elements.map((element, index) => {
        if (element.type === CustomNode.WEIGHTED_ATTRIBUTE) {
          const attributeNode = element as Node;
          // shift all attribute nodes to the left of the deleted node to the right
          if (index < indexOfDeletedNode) {
            return updateNodePosition(attributeNode, {
              x: attributeNode.position.x + 150,
            });
          } else if (index > indexOfDeletedNode) {
            // shift all attribute nodes to the right of the deleted node to the left
            return updateNodePosition(attributeNode, {
              x: attributeNode.position.x - 150,
            });
          }
          return attributeNode;
        }
        // update weightings values
        if (element.type === CustomNode.OPTION) {
          const updatedWeightings = omit(
            element.data.weightings,
            nodeToRemove.id
          );

          return {
            ...element,
            data: {
              ...element.data,
              weightings: updatedWeightings,
            },
          };
        }

        if (element.type === CustomNode.RESULT) {
          const resultElement = element as Node;
          return updateNodePosition(resultElement, {
            y: resultElement.position.y - 70,
          });
        }

        return element;
      });

    case CustomNode.OPTION:
      return elements.map((element, index) => {
        if (element.type === CustomNode.OPTION) {
          const optionNode = element as Node;
          // shift all option nodes to the left of the deleted node to the right
          if (index < indexOfDeletedNode) {
            return updateNodePosition(optionNode, {
              x: optionNode.position.x + 150,
            });
          } else if (index > indexOfDeletedNode) {
            // shift all option nodes to the right of the deleted node to the left
            return updateNodePosition(optionNode, {
              x: optionNode.position.x - 150,
            });
          }
          return optionNode;
        }

        return element;
      });

    default:
      return elements;
  }
};
