import React, {useEffect, useState, useContext} from "react";
import { render } from "react-dom";
import Calendar from "./Calendar";
import "./index.css";
import styles from "../../styles/Calendar.module.css"
import TopNavbar from "../Navigation/topNavbar";
import { Context } from "../../context/Context";

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

  }, [])
  
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
