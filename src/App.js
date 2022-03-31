import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import HomePage from "./components/HomePage";
import CoursePage from "./pages/CoursePage.jsx";
import { Context } from "./context/Context";
import NavBar from "./components/Navigation/NavBar";
// import "./App.css";
import React, {useState, useRef, useContext, useEffect} from "react";

import CalendarPage from "./components/Calendar/CalendarPage";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./components/Chat/Chat";
import Sample from "./PdfView/Sample";

function App(){
  const {user}=useContext(Context);
    return (
      <Router>
      <div style={{display : "flex", width : "100%", minHeight:"100vh"}}>
      {user? <NavBar/> : null} 
        <Routes>
        <Route exact path={"/"} element={<HomePage />} />  
        <Route path={"/calendar"} element={<ProtectedRoute Component={CalendarPage}/>}/>
        <Route path={"/chat"} element={<ProtectedRoute Component={Chat}/>}/>
        <Route path="/coursepage/:cid" element={<ProtectedRoute Component={CoursePage}/>}/>
        <Route path="/pdf" element={<ProtectedRoute Component={Sample}/>}/>
       </Routes>
       </div>
      </Router>
     

    );
}

export default App;