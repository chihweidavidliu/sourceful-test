import React, { useEffect, useState } from "react";
import omit from "lodash.omit";
import shortid from "shortid";
import ReactFlow, {
  Edge,
  removeElements,
  Elements,
  Node,
  addEdge,
  Connection,
  Position,
  Background,
  isEdge,
} from "react-flow-renderer";
import styled from "styled-components";
import WeightedAttribute from "../WeightedAttribute";
import Option from "../Option";
import Result from "../Result";
import { CustomNode } from "../../types/CustomNode";
import { getDefaultElements } from "./getDefaultElements";
import { IOptionProps } from "../Option";
import { IWeightedAttributeProps } from "../WeightedAttribute";

const EditorWrapper = styled.div`
  height: 80vh;
  border: 1px solid lightgrey;
`;

const nodeTypes = {
  [CustomNode.WEIGHTED_ATTRIBUTE]: WeightedAttribute,
  [CustomNode.OPTION]: Option,
  [CustomNode.RESULT]: Result,
};

const Editor = () => {
  const [elements, setElements] = useState<Elements>([]);

  const handleChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setElements((els) =>
      els.map((e) => {
        if (isEdge(e) || e.id !== id) {
          return e;
        }
        const { name, value } = event.target;
        return {
          ...e,
          data: {
            ...e.data,
            [name]: value,
          },
        };
      })
    );
  };

  const setAttributeScore = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setElements((els) =>
      els.map((element) => {
        if (isEdge(element) || element.id !== id) {
          return element;
        }

        const attributeId = event.target.name;
        const attributeScore = event.target.value;

        const updatedScores = {
          ...element.data.scores,
          [attributeId]: attributeScore,
        };

        return {
          ...element,
          data: {
            ...element.data,
            scores: updatedScores,
          },
        };
      })
    );
  };

  useEffect(() => {
    setElements(
      getDefaultElements({
        handleChange,
        setAttributeScore,
      })
    );
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) => {
    const weightedAttribute = elementsToRemove.find(
      (element) => element?.type === CustomNode.WEIGHTED_ATTRIBUTE
    );
    if (weightedAttribute) {
      // remove attribute from all option nodes
      setElements((elements) =>
        elements.map((element) => {
          if (element.type === CustomNode.OPTION) {
            const updatedWeightings = omit(
              element.data.weightings,
              weightedAttribute.id
            );
            return {
              ...element,
              data: {
                ...element.data,
                weightings: updatedWeightings,
              },
            };
          }

          return element;
        })
      );
    }

    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params: Edge | Connection) =>
    setElements((els) => addEdge(params, els));

  const addOption = () => {
    const id = shortid.generate();

    const lastOption = elements.find(
      (element) => element.type === CustomNode.OPTION
    ) as Node;

    const newOption: IOptionProps = {
      id: id,
      type: CustomNode.OPTION,
      data: {
        label: "New Option",
        handleChange,
        setAttributeScore,
        scores: {},
      },
      position: {
        x: lastOption ? lastOption.position.x + 300 : 100,
        y: lastOption ? lastOption.position.y : 300,
      },
      targetPosition: Position.Top,
    };

    setElements((elements) => [newOption, ...elements]);
    // add edges
    const newEdges: Edge[] = elements
      .filter(
        (element) =>
          element.type === CustomNode.WEIGHTED_ATTRIBUTE ||
          element.type === CustomNode.RESULT
      )
      .map((element) => {
        if (element.type === CustomNode.WEIGHTED_ATTRIBUTE) {
          return {
            id: shortid.generate(),
            source: element.id,
            target: newOption.id,
            sourceHandle: "a",
            targetHandle: "a",
            animated: true,
            style: { stroke: "teal" },
          };
        }

        return {
          id: shortid.generate(),
          source: newOption.id,
          target: element.id,
          sourceHandle: "b",
          targetHandle: "a",
          animated: true,
          style: { stroke: "teal" },
        };
      });

    setElements((elements) => [...elements, ...newEdges]);
  };

  const addWeightedAttribute = () => {
    const id = shortid.generate();

    const lastWeightedAttribute = elements.find(
      (element) => element.type === CustomNode.WEIGHTED_ATTRIBUTE
    ) as Node;

    const newAttribute: IWeightedAttributeProps = {
      id,
      type: CustomNode.WEIGHTED_ATTRIBUTE,
      data: {
        label: "New Attribute",
        handleChange,
        weighting: 1,
      },
      position: {
        x: lastWeightedAttribute
          ? lastWeightedAttribute?.position.x + 300
          : 100,
        y: lastWeightedAttribute ? lastWeightedAttribute?.position.y : 50,
      },
    };

    setElements((elements) => [newAttribute, ...elements]);

    // add edges
    const options = elements.filter(
      (element) => element.type === CustomNode.OPTION
    );
    const newEdges = options.map((option) => {
      return {
        id: shortid.generate(),
        source: id,
        target: option.id,
        sourceHandle: "a",
        targetHandle: "a",
        animated: true,
        style: { stroke: "teal" },
      };
    });

    setElements((elements) => [...elements, ...newEdges]);
  };

  return (
    <div>
      <button onClick={addWeightedAttribute}>Add Attribute</button>
      <button onClick={addOption}>Add Option</button>
      <EditorWrapper>
        <ReactFlow
          nodeTypes={nodeTypes}
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={8} /* 'delete'-key */
          snapToGrid={true}
          snapGrid={[15, 15]}
          defaultZoom={0.8}
        >
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </EditorWrapper>
    </div>
  );
};

export default Editor;
