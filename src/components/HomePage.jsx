import React, {useState, useRef, useContext, useEffect} from "react";
import { Context } from "../context/Context";
import SignIn from "./Authentication/SignIn";
import DashBoard from "../pages/Dashboard";

export default function HomePage() {
    const {user}=useContext(Context);

    return(
        <div style={{width : "100%"}}>
           {user? <DashBoard/> : <SignIn/>} 
        </div>
    );

}