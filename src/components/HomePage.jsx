import React, {useState, useRef, useContext, useEffect} from "react";
import { Context } from "../context/Context";
import SignIn from "./Authentication/SignIn";
import DashboardPage from "./Dashboard/temp";

export default function HomePage() {
    const {user}=useContext(Context);
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        setCurrentUser(user);
      }, [user]);

    return(
        <div>
           {currentUser? <DashboardPage/> : <SignIn/>} 
        </div>
    );

}