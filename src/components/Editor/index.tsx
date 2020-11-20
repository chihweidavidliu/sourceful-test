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
  Background,
  isEdge,
  FlowElement,
} from "react-flow-renderer";
import styled from "styled-components";
import WeightedAttribute from "../WeightedAttribute";
import Option from "../Option";
import Result from "../Result";
import { CustomNode } from "../../types/CustomNode";
import { getDefaultElements } from "./getDefaultElements";
import { IOptionProps } from "../Option";
import { IWeightedAttributeProps } from "../WeightedAttribute";
import { Button, ButtonGroup } from "../Button";
import CustomMiniMap from "../MiniMap";
import { findLastIndex } from "../../util/findLastIndex";

const EditorWrapper = styled.div`
  height: 82vh;
  width: 95vw;
  margin: 0 auto;
  border: 1px solid lightgrey;
  background: white;
  border-radius: 5px;
`;

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 36px;
  margin-bottom: 10px;
`;

const Toolbar = styled.div`
  padding: 15px;
  height: 15vh;
  max-height: 15vh;
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    setElements((elements) =>
      elements.map((element) => {
        if (isEdge(element) || element.id !== id) {
          return element;
        }
        const { name, value } = event.target;

        const updatedNode: Node = {
          ...element,
          data: {
            ...element.data,
            [name]: value,
          },
        };

        return updatedNode;
      })
    );
  };

  const setAttributeScore = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setElements((elements) =>
      elements.map((element) => {
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
    const resultNode = elementsToRemove.find(
      (element) => element?.type === CustomNode.RESULT
    );

    if (resultNode) {
      return alert("Cannot delete result node");
    }

    const weightedAttribute = elementsToRemove.find(
      (element) => element?.type === CustomNode.WEIGHTED_ATTRIBUTE
    );

    if (weightedAttribute) {
      // remove attribute from all option nodes and move results down
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

          if (element.type === CustomNode.RESULT) {
            const resultElement = element as Node;
            return {
              ...element,
              position: {
                x: resultElement.position.x,
                y: resultElement.position.y - 70,
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

  const getLastElementByType = (type: CustomNode) => {
    const lastIndex = findLastIndex<FlowElement>(
      elements,
      (element: FlowElement) => {
        return element.type === type;
      }
    );
    const lastElement = elements[lastIndex] as Node;
    return lastElement;
  };

  const addOption = () => {
    const id = shortid.generate();

    // get last created option to determine position of new option
    const lastOption = getLastElementByType(CustomNode.OPTION);

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
    };
    console.log("NEW OPTION ID", newOption.id);

    setElements((elements) => [...elements, newOption]);

    setElements((elements) => {
      // add edges
      const newEdges: Edge[] = elements
        .filter(
          (element) => element.type === CustomNode.WEIGHTED_ATTRIBUTE
          // element.type === CustomNode.RESULT
        )
        .map((element) => {
          const edgeId = shortid.generate();
          if (element.type === CustomNode.WEIGHTED_ATTRIBUTE) {
            console.log("edgeId", edgeId);
            return {
              id: edgeId,
              source: element.id,
              target: newOption.id,
              sourceHandle: "a",
              targetHandle: "a",
              animated: true,
              style: { stroke: "teal" },
            };
          }

          return {
            id: edgeId,
            source: newOption.id,
            target: element.id,
            sourceHandle: "b",
            targetHandle: "a",
            animated: true,
            style: { stroke: "teal" },
          };
        });

      return [...elements, ...newEdges];
    });
  };

  const addWeightedAttribute = () => {
    const id = shortid.generate();

    // get last created weighted attribute to determine position of new attribute
    const lastWeightedAttribute = getLastElementByType(
      CustomNode.WEIGHTED_ATTRIBUTE
    );

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

    setElements((elements) => [...elements, newAttribute]);

    setElements((elements) => {
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

      return [...elements, ...newEdges];
    });

    // move results down
    setElements((elements) =>
      elements.map((element) => {
        if (isEdge(element) || element.type !== CustomNode.RESULT) {
          return element;
        }

        const updatedNode: Node = {
          ...element,
          position: { x: element.position.x, y: element.position.y + 70 },
        };

        return updatedNode;
      })
    );
  };

  return (
    <>
      <Toolbar>
        <H1>Decision Maker</H1>
        <ButtonGroup>
          <Button onClick={addWeightedAttribute}>Add Attribute</Button>
          <Button onClick={addOption}>Add Option</Button>
        </ButtonGroup>
      </Toolbar>

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
          <CustomMiniMap />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </EditorWrapper>
    </>
  );
};

export default Editor;
