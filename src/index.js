import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './context/Context';
import App from "./App";
import 'bulma/css/bulma.min.css';


ReactDOM.render(
  <div>

  <ContextProvider>
      <App />
  </ContextProvider>
   
  </div>,
  document.getElementById("root")
);
