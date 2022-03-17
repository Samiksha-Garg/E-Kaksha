
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


/*
index.js stores main Render call from ReactDOM. 
It imports our App.js component which tells React where to render it 
(We will find this div element in our index.html file).
To be more concise, react is for the components and react-dom is for rendering the components in the DOM. 
‘react-dom’ acts as a glue between components and DOM. 
We will be using render() method of the react-dom to render components in the DOM
*/