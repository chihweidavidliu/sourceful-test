import React, { useEffect, useState } from "react";
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

const EditorWrapper = styled.div`
  height: 80vh;
  border: 1px solid lightgrey;
`;

const initBgColor = "#1A192B";

const nodeTypes = {
  weightingInput: WeightingInput,
  option: Option,
};

const Editor = () => {
  const [elements, setElements] = useState<Elements>([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event: any) => {
      setElements((els) =>
        els.map((e) => {
          if (isEdge(e) || e.id !== "2") {
            return e;
          }
          const color = event.target.value;
          setBgColor(color);
          return {
            ...e,
            data: {
              ...e.data,
              color,
            },
          };
        })
      );
    };

    setElements([
      {
        id: "2",
        type: "weightingInput",
        data: { onChange: onChange, weighting: 0 },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: "3",
        type: "option",
        data: { label: "Option A" },
        position: { x: 100, y: 400 },
        targetPosition: Position.Top,
      },
      {
        id: "4",
        type: "option",
        data: { label: "Option B" },
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
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: Edge | Connection) =>
    setElements((els) => addEdge(params, els));

  return (
    <div>
      <button>Add Input</button>
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
