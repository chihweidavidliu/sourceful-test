import { Elements, Node } from "react-flow-renderer";
import shortid from "shortid";
import { CustomNode } from "../../../types/CustomNode";
import { defaultEdgeStyle } from "../../../util/defaultEdgeStyle";

export const addEdgesOnCreate = (elements: Elements, newNode: Node) => {
  switch (newNode.type) {
    case CustomNode.OPTION:
      return elements
        .filter(
          (element) =>
            element.type === CustomNode.WEIGHTED_ATTRIBUTE ||
            element.type === CustomNode.RESULT
        )
        .map((element) => {
          const edgeId = shortid.generate();

          if (element.type === CustomNode.WEIGHTED_ATTRIBUTE) {
            return {
              id: edgeId,
              source: element.id,
              target: newNode.id,
              sourceHandle: "a",
              targetHandle: "a",
              animated: true,
              style: defaultEdgeStyle,
            };
          }

          return {
            id: edgeId,
            source: newNode.id,
            target: element.id,
            sourceHandle: "b",
            targetHandle: "a",
            animated: true,
            style: defaultEdgeStyle,
          };
        });

    case CustomNode.WEIGHTED_ATTRIBUTE:
      const options = elements.filter(
        (element) => element.type === CustomNode.OPTION
      );

      return options.map((option) => {
        return {
          id: shortid.generate(),
          source: newNode.id,
          target: option.id,
          sourceHandle: "a",
          targetHandle: "a",
          animated: true,
          style: defaultEdgeStyle,
        };
      });

    default:
      return elements;
  }
};
