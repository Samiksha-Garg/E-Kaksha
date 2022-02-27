import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import HomePage from "./components/HomePage";

function App(){
    return (
        <Router>
          <Routes>
            <Route exact path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<SignIn/>} />
            <Route path={"/register"} element={<SignUp />} />
          </Routes>
        </Router>        
    );
}
export default App;