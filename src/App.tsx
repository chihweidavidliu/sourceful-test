import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
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
  background-image: url(${({ backgroundImg }) => backgroundImg});
  background-size: cover;
`;

export interface ITheme {
  [index: string]: string;
}

export interface IThemeWrapper {
  theme: ITheme;
}

export const theme: ITheme = {
  darkAccentColour: "#2d165b",
  lightAccentColour: "#EF4158",
};

const GlobalStyle = createGlobalStyle<IThemeWrapper>`
  body {
    margin: 0 auto;
    padding: 0;
    font-family: "Ubuntu", sans-serif;
  }
  html {
    box-sizing: border-box;
    padding: 0;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper backgroundImg={backgroundImage}>
        <Editor />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
