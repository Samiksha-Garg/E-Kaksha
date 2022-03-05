import React, {useState, useRef, useContext, useEffect} from "react";
import { Context } from "../context/Context";
import SignIn from "./Authentication/SignIn";
import DashboardPage from "./Dashboard/temp";
import DashBoard from "../pages/Dashboard";

export default function HomePage() {
    const {user}=useContext(Context);

    return(
        <div>
           {user? <DashBoard/> : <SignIn/>} 
        </div>
    );

}