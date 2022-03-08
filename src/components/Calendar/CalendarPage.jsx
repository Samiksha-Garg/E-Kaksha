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
  const [assig,setAssig]=useState([]);

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
  
  
  useEffect(async () => {
    let courseArray = user.courses;
    let l = courseArray.length;
    let assigEvents=[];

    for(let i=0;i<l;i++){
        //console.log(courseArray[i]);
        const response = await axios.get("/assignment/courseid/"+courseArray[i]);
        //console.log(response.data);
        let assigArrayOfCourse=response.data;
        let len=assigArrayOfCourse.length;
        for(let j=0;j<len;j++){
          // let temp=assigArrayOfCourse[i].deadline;
          // let strtdate=
          assigEvents.push(
            {
              title:assigArrayOfCourse[i].title,
              start:assigArrayOfCourse[i].deadline,
              end:assigArrayOfCourse[i].deadline,
              type:"global"
            }
          );
        }    
    }
    setEvents(oldArray => [...oldArray, ...assigEvents]);
  },[])
  console.log(events);

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
