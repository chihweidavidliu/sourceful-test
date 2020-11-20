import React from "react";
import styled from "styled-components";
import "./App.css";
import Editor from "./components/Editor";
import backgroundImage from "./static/background.jpg";

const AppWrapper = styled.div<{ backgroundImg: string }>`
  text-align: center;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Ubuntu", sans-serif;
  background-image: url(${({ backgroundImg }) => backgroundImg});
  background-size: cover;

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

function App() {
  return (
    <AppWrapper backgroundImg={backgroundImage}>
      <Editor />
    </AppWrapper>
  );
}

export default App;
