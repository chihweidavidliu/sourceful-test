import React, { useEffect, useState } from "react";
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
  useZoomPanHelper,
} from "react-flow-renderer";
import styled from "styled-components";
import WeightedAttribute from "../WeightedAttribute";
import Option from "../Option";
import Result from "../Result";
import { CustomNode } from "../../types/CustomNode";
import { getDefaultElements } from "./helpers/getDefaultElements";
import { IOptionProps } from "../Option";
import { IWeightedAttributeProps } from "../WeightedAttribute";
import { Button, ButtonGroup } from "../Button";
import CustomMiniMap from "../MiniMap";
import Tips from "../Tips";
import { shiftNodesOnDelete } from "./helpers/shiftNodesOnDelete";
import { updateNodePosition } from "./helpers/updateNodePosition";
import { addEdgesOnCreate } from "./helpers/addEdgesOnCreate";
import { getLastElementByType } from "./helpers/getLastElementByType";

const EditorWrapper = styled.div`
  height: 80vh;
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
  height: 18vh;
  max-height: 18vh;
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

  const setAttributeWeighting = (id: string, weighting: number) => {
    setElements((elements) =>
      elements.map((element) => {
        if (isEdge(element) || element.id !== id) {
          return element;
        }

        const updatedNode: Node = {
          ...element,
          data: {
            ...element.data,
            weighting,
          },
        };

        return updatedNode;
      })
    );
  };

  const setAttributeScore = (
    id: string,
    attributeId: string,
    value: number
  ) => {
    setElements((elements) =>
      elements.map((element) => {
        if (isEdge(element) || element.id !== id) {
          return element;
        }

        const updatedScores = {
          ...element.data.scores,
          [attributeId]: value,
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

  const [elements, setElements] = useState<Elements>(
    getDefaultElements({
      handleChange,
      setAttributeScore,
      setAttributeWeighting,
    })
  );

  const { fitView } = useZoomPanHelper();

  // fit graph into view on load
  useEffect(() => {
    fitView();
  }, [fitView]);

  const onElementsRemove = (elementsToRemove: Elements) => {
    const nodeToRemove = elementsToRemove.find((element) => !isEdge(element));

    const indexOfNodeToDelete = nodeToRemove
      ? elements.findIndex((element) => element.id === nodeToRemove.id)
      : -1;

    if (nodeToRemove?.type === CustomNode.RESULT) {
      return alert("Cannot delete result node");
    }

    if (nodeToRemove?.type === CustomNode.WEIGHTED_ATTRIBUTE) {
      // remove attribute from all option nodes and move results down
      setElements((elements) =>
        shiftNodesOnDelete(
          elements,
          indexOfNodeToDelete,
          CustomNode.WEIGHTED_ATTRIBUTE
        )
      );
    }

    if (nodeToRemove?.type === CustomNode.OPTION) {
      setElements((elements) =>
        shiftNodesOnDelete(elements, indexOfNodeToDelete, CustomNode.OPTION)
      );
    }

    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params: Edge | Connection) =>
    setElements((els) => addEdge(params, els));

  const addOption = () => {
    const id = shortid.generate();

    setElements((elements) =>
      elements.map((element) => {
        // shift existing options left
        if (element.type === CustomNode.OPTION) {
          const optionNode = element as Node;

          return updateNodePosition(optionNode, {
            x: optionNode.position.x - 150,
          });
        }

        return element;
      })
    );

    // get last created option to determine position of new option
    const lastOption = getLastElementByType(
      elements,
      CustomNode.OPTION
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
        x: lastOption ? lastOption.position.x + 150 : 100,
        y: lastOption ? lastOption.position.y : 300,
      },
    };

    // add new option
    setElements((elements) => [...elements, newOption]);

    // add edges
    setElements((elements) => {
      const newEdges = addEdgesOnCreate(elements, newOption);
      return [...elements, ...newEdges];
    });

    // adjust view
    fitView();
  };

  const addWeightedAttribute = () => {
    const id = shortid.generate();

    setElements((elements) =>
      elements.map((element) => {
        // shift existing attributes left
        if (element.type === CustomNode.WEIGHTED_ATTRIBUTE) {
          const attributeNode = element as Node;
          return updateNodePosition(attributeNode, {
            x: attributeNode.position.x - 150,
          });
        }

        // shift result down
        if (element.type === CustomNode.RESULT) {
          const resultNode = element as Node;
          return updateNodePosition(resultNode, {
            y: resultNode.position.y + 70,
          });
        }
        return element;
      })
    );

    // get last created weighted attribute to determine position of new attribute
    const lastWeightedAttribute = getLastElementByType(
      elements,
      CustomNode.WEIGHTED_ATTRIBUTE
    ) as Node;

    const newAttribute: IWeightedAttributeProps = {
      id,
      type: CustomNode.WEIGHTED_ATTRIBUTE,
      data: {
        label: "New Attribute",
        setAttributeWeighting,
        handleChange,
        weighting: 1,
      },
      position: {
        x: lastWeightedAttribute
          ? lastWeightedAttribute?.position.x + 150
          : 100,
        y: lastWeightedAttribute ? lastWeightedAttribute?.position.y : 50,
      },
    };

    setElements((elements) => [...elements, newAttribute]);

    setElements((elements) => {
      // add edges
      const newEdges = addEdgesOnCreate(elements, newAttribute);
      return [...elements, ...newEdges];
    });

    fitView();
  };

  return (
    <>
      <Toolbar>
        <H1>Decision Maker</H1>
        <ButtonGroup>
          <Button onClick={addWeightedAttribute}>Add Attribute</Button>
          <Button onClick={addOption}>Add Option</Button>
        </ButtonGroup>
        <Tips />
      </Toolbar>

      <EditorWrapper>
        <ReactFlow
          nodeTypes={nodeTypes}
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
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
