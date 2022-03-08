import React, {useEffect, useState, useContext} from "react";
import { render } from "react-dom";
import Calendar from "./Calendar";
import "./index.css";
import styles from "../../styles/Calendar.module.css"
import TopNavbar from "../Navigation/topNavbar";
import { Context } from "../../context/Context";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { set } from "date-fns";

export default function CalendarPage() {

  const {user}=useContext(Context);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [classes, setClass] = useState([]);
  const [quiz, setQuizzes] = useState([]);
  const [assig,setAssig]=useState([]);
  const [personal, setPersonal] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isAssignmentChecked, setAssignChecked] = useState(true);
  const [isClassChecked, setClassChecked] = useState(true);
  const [isQuizChecked, setQuizChecked] = useState(true);
  const [isPersonalChecked, setPersonalChecked] = useState(true);

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleFilters = () => {
    setEvents([]);

    if (isAssignmentChecked) {
      if (selectedCourse != '') {
        let temp = []
        let l = assig.length

        for (let i = 0; i < l; i++) {
          if (assig[i].course == selectedCourse) {
            temp.push(assig[i]);
          }
        }
        
        setEvents(oldArray => [...oldArray, ...temp]);
      } else {
        setEvents(oldArray => [...oldArray, ...assig]);
      }
      
    }

    if (isQuizChecked) {
      if (selectedCourse != '') {
        let temp = []
        let l = quiz.length

        for (let i = 0; i < l; i++) {
          if (quiz[i].course == selectedCourse) {
            temp.push(quiz[i]);
          }
        }
        
        setEvents(oldArray => [...oldArray, ...temp]);
      } else {
      setEvents(oldArray => [...oldArray, ...quiz]);
      }
    }

    if (isPersonalChecked) {
      setEvents(oldArray => [...oldArray, ...personal]);
    }

    if (isClassChecked) {
      if (selectedCourse != '') {
        let temp = []
        let l = classes.length

        for (let i = 0; i < l; i++) {
          if (classes[i].course == selectedCourse) {
            temp.push(classes[i]);
          }
        }
        
        setEvents(oldArray => [...oldArray, ...temp]);
      } else {
      setEvents(oldArray => [...oldArray, ...classes]);
      }
    }

  }
  
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
          type : "personal"});
    }

    setPersonal(pEvents);
    setEvents(pEvents);

  }, []);

  //Adding assignment, quizes,classes events
  useEffect(async () => {
    let courseArray = user.courses;
    let courseNameArray=[];
    let l = courseArray.length;
    let assigEvents=[];
    let quizEvents = [];
    let classEvents = [];

    for(let i=0;i<l;i++){
        //console.log(courseArray[i]);
        const response1 = await axios.get("/assignment/courseid/"+courseArray[i]);
        const response2 = await axios.get("/quiz/courseid/" + courseArray[i]);
        const response3 = await axios.get("/class/courseid/" + courseArray[i]);
        const res= await axios.get("/course/courseName/" + courseArray[i]);
        const courseName=res.data.name;
        
        courseNameArray.push({
          cid: courseArray[i],
          name: courseName
        });
        console.log(courseNameArray);
        //Assignment events
        let assigArrayOfCourse=response1.data;
        let len=assigArrayOfCourse.length;
        for(let j=0;j<len;j++){
          assigEvents.push(
            {
              title:assigArrayOfCourse[j].title,
              start:new Date(assigArrayOfCourse[j].deadline).subHours(2),
              end:new Date(assigArrayOfCourse[j].deadline),
              type:"assig",
              course : courseName
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
              type : "quiz",
              course : courseName
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
              type : "class",
              course : courseName
            })
          }
    }

    //console.log(courseNameArray);

    setAssig(assigEvents);
    setClass(classEvents);
    setQuizzes(quizEvents);
    setCourses(courseNameArray);
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="courseId">Course</InputLabel>
        <Select
          labelId="courseId"
          id="courseId-dropdown"
          value={selectedCourse}
          label="Course"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {courses.map((event) => {
          return <MenuItem value={event.name}> {event.name} </MenuItem>;
        })} 
        </Select>
      </FormControl>
      <br/>
      <FormControlLabel
                control={<Checkbox checked={isAssignmentChecked} onChange={() => setAssignChecked(!isAssignmentChecked)} color="primary" />}
                label="Assignments"
      />
      <br/>
         <FormControlLabel
                control={<Checkbox checked={isClassChecked} onChange={() => setClassChecked(!isClassChecked)} color="primary" />}
                label="Classes"
      />
      <br/>
         <FormControlLabel
                control={<Checkbox checked={isQuizChecked} onChange={() => setQuizChecked(!isQuizChecked)} color="primary" />}
                label="Quizzes"
      />
      <br/>
         <FormControlLabel
                control={<Checkbox checked={isPersonalChecked} onChange={() => setPersonalChecked(!isPersonalChecked)} color="primary" />}
                label="Personal Events"
      />
      <br/>

<Button onClick={handleFilters}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              Set Filters
            </Button>
     
     </div>
    <Calendar allEvents = {events}/>
  </div>
  </div>);
}
