import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ThemeContextProviderWDS from './context/ThemeContext';
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProviderWDS>
      <App />
    </ThemeContextProviderWDS>
  </React.StrictMode>,
  document.getElementById("root")
);
