import { Elements, FlowElement } from "react-flow-renderer";
import { CustomNode } from "../../types/CustomNode";
import { findLastIndex } from "../../util/findLastIndex";

export const getLastElementByType = (elements: Elements, type: CustomNode) => {
  const lastIndex = findLastIndex<FlowElement>(
    elements,
    (element: FlowElement) => {
      return element.type === type;
    }
  );

  const lastElement = elements[lastIndex];
  return lastElement;
};
