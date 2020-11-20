import React from "react";
import { MiniMap } from "react-flow-renderer";
import { CustomNode } from "../../types/CustomNode";

const CustomMiniMap = () => (
  <MiniMap
    nodeStrokeColor={(n) => {
      if (n.type === CustomNode.WEIGHTED_ATTRIBUTE) return "#0041d0";
      if (n.type === CustomNode.OPTION) return "#ff0072";
      if (n.type === CustomNode.RESULT) return "#1a192b";
      return "#eee";
    }}
    nodeColor={(n) => {
      return "#fff";
    }}
    nodeBorderRadius={2}
  />
);

export default CustomMiniMap;
