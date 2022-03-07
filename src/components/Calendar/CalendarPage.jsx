import React, {useEffect, useState, useContext} from "react";
import { render } from "react-dom";
import Calendar from "./Calendar";
import "./index.css";
import styles from "../../styles/Calendar.module.css"
import TopNavbar from "../Navigation/topNavbar";
import { Context } from "../../context/Context";
import axios from "axios";
export default function CalendarPage() {

  const {user}=useContext(Context);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let personalEvents = user.personalEvents
    let l = personalEvents.length;

    let pEvents = []

      for (let i = 0; i < l; i++) {
        // setPersonalEvents(oldArray => [...oldArray, currUser.personalEvents[i]]);
        
        pEvents.push({title : personalEvents[i].Title,
          start : new Date(personalEvents[i].Start),
          end : new Date(personalEvents[i].End),
          type : "global"});
    }

    setEvents(pEvents);

  }, []);
  
  useEffect(()=>{
    let courseArray = user.courses;
    let l = courseArray.length;
    let assigEvents=[];

    for(let i=0;i<l;i++){
      let assigOfCourse=[];
       console.log(courseArray[i]);
      
        //assignment db compared with assignment array
        const getAssig= async()=>{
          const res=await axios.get("http://localhost:1000/api/assignments");
          console.log(res);
      }
      getAssig();
        
        
      
    }
  },[])
  // console.log(events);
return (
  <div style={{width : "100%"}}>
  <TopNavbar/>
  <div className={styles.container}>
    <div className={styles.filters} style={{width : "30%"}}> 
      <h1> Filters</h1>
     </div>
    <Calendar allEvents = {events}/>
  </div>
  </div>);
}
