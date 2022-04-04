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
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { set } from "date-fns";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';


export default function CalendarPage() {

  const {user, dispatch}=useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [title, setTitle] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [eventError, setEventError] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const validate = () => {
    let errors = {};
    
    if (!title) {
      errors.title = "Title Can't be empty"
    }

    if (!startDate) {
      errors.start = "Start Date Can't be empty";
    }

    if (!endDate) {
      errors.end = "End Date Can't be empty";
    } else {
      if (startDate) {
        if (startDate > endDate) {
          errors.end = "Invalid End Date";
        }
      }
    }

    return errors;
  };
  const handleTitleChange = (e) => {
    const {value } = e.target;
    setTitle(value);
  }

  const submitForm = async() => {
  let pEvents = user.personalEvents;
  pEvents.push({
    Title : title,
    Start : startDate,
    End : endDate
  })
    const response = await axios.put("/auth/update/" + user._id, {
      name : user.name,
      email : user.email,
      courses : user.courses,
      dob : user.dob,
      personalEvents : pEvents,
      role : user.role,
    });

    dispatch({type:"UPDATE_USER", payload: response.data});
    handleClose();
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    } else {
      setIsSubmitting(false);
    }
  }, [formErrors]);

  const checkFunc = (event) => {
    setFormErrors(validate());
    setIsSubmitting(true);
  }

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleClose = () => {
    setEndDate(null);
    setStartDate(null);
    setTitle('');
    setShowModal(false);
  
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

  

  //Adding assignment, quizes,classes, personal events
  useEffect(async () => {
    let personalEvents = user.personalEvents
    let l1 = personalEvents.length;

    let pEvents = []

      for (let i = 0; i < l1; i++) {
        pEvents.push({title : personalEvents[i].Title,
          start : new Date(personalEvents[i].Start),
          end : new Date(personalEvents[i].End),
          type : "personal"});
    }

    setPersonal(pEvents);
    setEvents(pEvents);

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
              end : new Date(quizArrayOfCourse[j].date).addHours(Math.ceil(quizArrayOfCourse[j].duration / 60)),
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

    setAssignChecked(true)
    setClassChecked(true)
    setQuizChecked(true)
    setPersonalChecked(true)
    setSelectedCourse('');

    setIsFetching(false);

    
  },[user])

  //console.log(events);


return (
  <div style={{width : "100%"}}>
  <TopNavbar/>
  <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={isFetching}
            
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <CircularProgress/>
              
              </DialogContentText>
            </DialogContent>
          </Dialog>
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
     <br/>

     <Button onClick={() => {
       setShowModal(true);
     }} 
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              Add Personal Event
      </Button>
      <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={showModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle id="alert-dialog-title">
            <div style={{width : "300px"}}>
        <center>Add Personal Event</center>
        <IconButton
          aria-label="close"
          onClick={() => setShowModal(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </div>
            </DialogTitle> */}
        
            <DialogContent style={{width : "100%"}}>
              <DialogContentText id="alert-dialog-description">
                <center>
                  <br/>
                  
                    
                  
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={styles.addPersonal}>
                  <div>
       <DateTimePicker
          label="Start Date And Time"
          value={startDate}
        onChange={(newValue) => {
          setStartDate(newValue);
        }}
          renderInput={(params) => <TextField {...params} />}
        />
         {formErrors.start && (
            <center><span className={styles.error}>{formErrors.start}</span></center>
            )}
        </div>
       
        <div style={{marginRight : "10px"}}></div>
        <div>
      <DateTimePicker
          label="End Date And Time"
          value={endDate}
        onChange={(newValue) => {
          setEndDate(newValue);
        }}
          renderInput={(params) => <TextField {...params} />}
        />
         {formErrors.end && (
            <center><span className={styles.error}>{formErrors.end}</span></center>
            )}
        </div>
         </div>
         </LocalizationProvider>
 
                <br/>
                
    <br/>
    <TextField id="title" label="Title" variant="standard" value={title} onChange={handleTitleChange} />
    {formErrors.title && (
            <center><span className={styles.error}>{formErrors.title}</span></center>
            )}
          <br/>
              <Button onClick={checkFunc}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              ADD
            </Button>
            </center>
              </DialogContentText>
            </DialogContent>
            </Dialog>

     </div>
    <Calendar allEvents = {events}/>
  </div>
  </div>);
}
