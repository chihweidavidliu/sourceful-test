import React, { useEffect, useState } from "react";
import omit from "lodash.omit";
import shortid from "shortid";
import ReactFlow, {
  Edge,
  removeElements,
  Elements,
  addEdge,
  Connection,
  Position,
  isEdge,
} from "react-flow-renderer";
import styled from "styled-components";
import WeightingInput from "../WeightingInput";
import Option from "../Option";
import ts from "typescript";

const EditorWrapper = styled.div`
  height: 80vh;
  border: 1px solid lightgrey;
`;

const nodeTypes = {
  weightingInput: WeightingInput,
  option: Option,
};

const Editor = () => {
  const [elements, setElements] = useState<Elements>([]);

  const handleWeightingChange = (id: string, event: any) => {
    setElements((els) =>
      els.map((e) => {
        if (isEdge(e) || e.id !== id) {
          return e;
        }
        const weighting = event.target.value;
        return {
          ...e,
          data: {
            ...e.data,
            weighting,
          },
        };
      })
    );
  };

  const handleLabelChange = (id: string, event: any) => {
    setElements((els) =>
      els.map((e) => {
        if (isEdge(e) || e.id !== id) {
          return e;
        }
        const label = event.target.value;
        return {
          ...e,
          data: {
            ...e.data,
            label,
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

        console.log("element", element);
        console.log("e.target.name", event.target.name);

        return {
          ...element,
          data: {
            ...element.data,
            scores: {
              ...element.data.scores,
              [event.target.name]: event.target.value,
            },
          },
        };
      })
    );
  };

  useEffect(() => {
    setElements([
      {
        id: "2",
        type: "weightingInput",
        data: {
          label: "New Attribute",
          handleWeightingChange,
          handleLabelChange,
          weighting: 1,
        },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: "3",
        type: "option",
        data: {
          label: "Option 1",
          setAttributeScore,
          handleLabelChange,
          scores: {
            "2": 50,
          },
        },
        position: { x: 100, y: 400 },
        targetPosition: Position.Top,
      },
      {
        id: "4",
        type: "option",
        data: {
          label: "Option 2",
          setAttributeScore,
          handleLabelChange,
          scores: {
            "2": 50,
          },
        },
        position: { x: 400, y: 400 },
        targetPosition: Position.Top,
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        targetHandle: "a",
        animated: true,
        style: { stroke: "teal" },
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        targetHandle: "a",
        animated: true,
        style: { stroke: "teal" },
      },
    ]);
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) => {
    const weightingInput = elementsToRemove.find(
      (element) => element?.type === "weightingInput"
    );
    if (weightingInput) {
      // remove attribute from all option nodes
      setElements((elements) =>
        elements.map((element) => {
          if (element.type === "option") {
            const updatedWeightings = omit(
              element.data.weightings,
              weightingInput.id
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
    const newOption = {
      id: id,
      type: "option",
      data: {
        label: "New Option",
        setAttributeScore,
        handleLabelChange,
        scores: {},
      },
      position: { x: 400, y: 400 },
      targetPosition: Position.Top,
    };

    setElements((elements) => [...elements, newOption]);
    // add edges
    const newEdges: Edge[] = elements
      .filter((element) => element.type === "weightingInput") // TODO: result node connection
      .map((element) => {
        return {
          id: shortid.generate(),
          source: element.id,
          target: newOption.id,
          sourceHandle: "a",
          targetHandle: "a",
          animated: true,
          style: { stroke: "teal" },
        };
      });

    setElements((elements) => [...elements, ...newEdges]);
  };

  const addWeightedAttribute = () => {
    const id = shortid.generate();
    const newAttribute = {
      id,
      type: "weightingInput",
      data: {
        label: "New Attribute",
        handleWeightingChange,
        handleLabelChange,
        weighting: 1,
      },
      style: { border: "1px solid #777", padding: 10 },
      position: { x: 300, y: 50 },
    };

    setElements((elements) => [...elements, newAttribute]);

    // add edges
    const options = elements.filter((element) => element.type === "option");
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
        />
      </EditorWrapper>
    </div>
  );
};

export default Editor;
