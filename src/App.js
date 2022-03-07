import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import HomePage from "./components/HomePage";
import { Context } from "./context/Context";
import NavBar from "./components/Navigation/NavBar";
// import "./App.css";
import React, {useState, useRef, useContext, useEffect} from "react";

function App(){
  const {user}=useContext(Context);
    return (

         
      <Router>
      <div style={{display : "flex"}}>
      {user? <NavBar/> : null} 
        <Routes>
        <Route exact path={"/"} element={<HomePage />} />        
       </Routes>
       </div>
      </Router>
  
        // <Router>
        //   <Routes>
        //   {/* <Route path="/assignments" element={<Assignments />} />
        //   <Route path="/calendar" element={<Calendar />} />
        //   <Route path="/attendence" element={<Attendance />} />
        //   <Route path="/chat" element={<Chat />} /> */}
        //     <Route exact path={"/"} element={<HomePage />} />
        //     <Route path={"/login"} element={<SignIn/>} />
        //     <Route path={"/register"} element={<SignUp />} />
        //   </Routes>
        // </Router>        
    );
}
export default App;

