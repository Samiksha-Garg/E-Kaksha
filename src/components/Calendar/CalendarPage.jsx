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
  const [events, setEvents] = useState([]); //events array store all events of a user
  
  Date.prototype.subHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
  }
  
  Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
  } 

  //Adding personal events
  useEffect(() => {
    let personalEvents = user.personalEvents
    let l = personalEvents.length;

    let pEvents = []

      for (let i = 0; i < l; i++) {
        pEvents.push({title : personalEvents[i].Title,
          start : new Date(personalEvents[i].Start),
          end : new Date(personalEvents[i].End),
          type : "global"});
    }

    setEvents(pEvents);

  }, []);

  //Adding assignment, quizes,classes events
  useEffect(async () => {
    let courseArray = user.courses;
    let l = courseArray.length;
    let assigEvents=[];
    let quizEvents = [];
    let classEvents = [];

    for(let i=0;i<l;i++){
        //console.log(courseArray[i]);
        const response1 = await axios.get("/assignment/courseid/"+courseArray[i]);
        const response2 = await axios.get("/quiz/courseid/" + courseArray[i]);
        const response3 = await axios.get("/class/courseid/" + courseArray[i]);
        
        //Assignment events
        let assigArrayOfCourse=response1.data;
        let len=assigArrayOfCourse.length;
        for(let j=0;j<len;j++){
          assigEvents.push(
            {
              title:assigArrayOfCourse[j].title,
              start:new Date(assigArrayOfCourse[j].deadline).subHours(2),
              end:new Date(assigArrayOfCourse[j].deadline),
              type:"global"
            }
          );
        }    

        //Quiz events
        let quizArrayOfCourse = response2.data;
          let len2 = quizArrayOfCourse.length;

          for (let j = 0; j < len2; j++) {
            quizEvents.push({
              title : quizArrayOfCourse[j].title,
              start : new Date(quizArrayOfCourse[j].date),
              end : new Date(quizArrayOfCourse[j].date).addHours(quizArrayOfCourse[j].duration),
              type : "global"
            });
          }

          //Classes events
          let classArrayOfCourse = response3.data;
          let len3 = classArrayOfCourse.length;

          for (let j = 0; j < len3; j++) {
            classEvents.push({
              title : "Class",
              start : new Date(classArrayOfCourse[j].beginTime),
              end : new Date(classArrayOfCourse[j].endTime),
              type : "global"
            })
          }
    }

    //inserting all events of courseArray[i] in the events array 
    setEvents(oldArray => [...oldArray, ...assigEvents]);
    setEvents(oldArray => [...oldArray, ...quizEvents]);
    setEvents(oldArray => [...oldArray, ...classEvents]);
    
  },[])

  //console.log(events);


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
