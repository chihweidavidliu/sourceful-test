import React from "react";
import styled from "styled-components";

const TipsWrapper = styled.div`
  margin-top: 12px;
  opacity: 0.8;
`;

const Tips = () => {
  return (
    <TipsWrapper>
      Press <strong>Backspace</strong> to delete a node
    </TipsWrapper>
  );
};

export default Tips;
