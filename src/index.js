import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import { ContextProvider } from './context/Context';
import App from "./App";

ReactDOM.render(
  <div>

  <ContextProvider>
      <App />
  </ContextProvider>
   
  </div>,
  document.getElementById("root")
);
