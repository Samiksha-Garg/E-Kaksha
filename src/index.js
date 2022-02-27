import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/Authentication/SignIn'
import { ContextProvider } from './context/Context';

ReactDOM.render(
  <div>
  <ContextProvider>
  <SignIn/>
  </ContextProvider>
   
  </div>,
  document.getElementById("root")
)
