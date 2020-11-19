import React from "react";
import styled from "styled-components";
import "./App.css";
import Editor from "./components/Editor";

const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

function App() {
  return (
    <AppWrapper>
      <Editor />
    </AppWrapper>
  );
}

export default App;
