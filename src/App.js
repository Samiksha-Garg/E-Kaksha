import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import HomePage from "./components/HomePage";

import { Context } from "./context/Context";
import NavBar from "./components/Navigation/NavBar";
// import "./App.css";
import React, {useState, useRef, useContext, useEffect} from "react";

import CalendarPage from "./components/Calendar/CalendarPage";
import ProtectedRoute from "./ProtectedRoute";


import ToDoAsnPage from "./components/ToDoAsn/ToDoAsnPage"
import AttendancePage from "./components/Attendance/AttendancePage"
import AttendanceDecider from "./components/Attendance/AttendanceDecider";


function App(){
  const {user}=useContext(Context);
    return (
      <div>
             <Router>
      <div style={{display : "flex", width : "100vw", minHeight:"100vh"}}>
      {user? <NavBar/> : null} 
        <Routes>
        <Route exact path={"/"} element={<HomePage />} />  
        <Route path={"/calendar"} element={<ProtectedRoute Component={CalendarPage}/>}/>
        <Route path={"/assignments"} element={<ProtectedRoute Component={ToDoAsnPage}/>}/>
        <Route path={"/attendance"} element={<ProtectedRoute Component={AttendanceDecider}/>}/>
       </Routes>
       </div>
      </Router>
      </div>
    );
}
export default App;

