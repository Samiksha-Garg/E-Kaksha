import { padding } from "@mui/system";
import { useEffect, useState, useContext} from "react";
import TopNavbar from "../components/Navigation/topNavbar";
import classes from "./CoursePage.module.css";
import CourseMaterial from "./CourseMaterial/CourseMaterial";
import QuizPage from "./QuizPage";
import AssignmentPage from "./AssignmentPage";
import { Assignment } from "@mui/icons-material";
import { useParams } from "react-router";
import axios from "axios";
import { Context } from "../context/Context";
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styles from "../styles/Calendar.module.css";
import TimePicker from '@mui/lab/TimePicker';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function CoursePage() {

  const notify = ()=>{
 
    // Calling toast method by passing string
    toast.success('Class Scheduled Successfully',  {position: toast.POSITION.BOTTOM_CENTER})
  }
  const {user} = useContext(Context);

    const[isAssignment,setAssignment]=useState(true);
    const[isCourseMaterial,setCourseMaterial]=useState(false);
    const[isQuizzes,setQuizzes]=useState(false);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuiz] = useState([]);
    const [material, setMaterial] = useState([]);
    const [courseDeets, setCourse] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

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
  
    const validate = () => {
      let errors = {};

      if (!startDate) {
        errors.date = "Date Can't be empty";
      }
  
      if (!startTime) {
        errors.start = "Start Time Can't be empty";
      }

      if (!endTime) {
        errors.end = "End Time Can't be empty";
      } else {
        if (startTime) {
          if (endTime < startTime) {
            errors.end = "Invalid End Time";
          }
        }
      }
  
      return errors;
    };

    const index = (newAssign) => {
      for (let i = 0; i < assignments.length; i++) {
        if (assignments[i]._id == newAssign._id) {
          return i;
        }
      }

      return -1;
    }

    const updateAssignment = (newAssign) => {
      let i = index(newAssign);
      let temp = assignments;
      if (i == -1) {
        temp.unshift(newAssign);
      } else {
        temp[i] = newAssign;
      }
      setAssignment(false);
      setAssignment(true);
      setAssignments(temp);
    }

    const updateMaterial = (newMaterial) => {
      let temp = material;
      temp.unshift(newMaterial);
      setCourseMaterial(false);
      setCourseMaterial(true);
      setMaterial(temp);
    }

    const { cid } = useParams();

    const openAssignment=()=>{setQuizzes(false);setAssignment(true);setCourseMaterial(false);}
    const openCourseMaterial=()=>{setQuizzes(false);setAssignment(false);setCourseMaterial(true);}
    const openQuizzes=()=>{setQuizzes(true);setAssignment(false);setCourseMaterial(false);}

    useEffect(async() => {
  
      const response1 = await axios.get("/assignment/courseid/"+ cid);
      const response2 = await axios.get("/quiz/courseid/" + cid);
      const response3 = await axios.get("/material/courseid/" + cid);
      const course = await axios.get("/course/" + cid);
      setCourse(course.data);
      setAssignments(response1.data.reverse());
      setQuiz(response2.data.reverse());
      setMaterial(response3.data.reverse());
    
    },[cid])

    const handleClose = () => {

      setStartDate(null);
      setFormErrors({});
      setStartTime(null);
      setEndTime(null);
      setAddModal(false);
    }

    const submitForm = async() => {
      const doc = {
        beginTime : startTime,
        endTime : endTime,
        date : startDate,
        courseId : cid
      }
      notify();

      const response = await axios.post("/class", doc);
      console.log(response);
      setIsSubmitting(false);
      handleClose();
    }

  return (
    <div style={{overflowX:"hidden",backgroundColor:"white",width:"100%"}}>
        <TopNavbar />
      <div
        style={{
          backgroundColor: "rgb(251,167,94)",
          padding: "30px 30px",
          margin: "20px 50px",
        }}
      >
        <div>
          <h2>{courseDeets? courseDeets.name : "Course Name!"}</h2>
        </div>
        <div>
          Meet Link :
          <a
            href="https://meet.google.com/"
            style={{ textTransform: "lowercase" }}
          >
            {" https://meet.google.com/ "}
          </a>
          
          <div
            style={{
              width: "150px",
              textAlign: "center",
              backgroundColor: "white",
              padding: "5px",
              float: "right",
            }}
          >
           {user.role == "teacher" && <btn onClick={() => {
             setAddModal(true);
           }}>Schedule a class</btn>}
           {user.role == "student" && <btn>Chat with Prof!</btn>}
          </div>
        </div>
      </div>
      <div style={{margin:"0px 50px",padding:"10px", backgroundColor:"slategrey",display:"flex"}} >
        <div className={classes.itemStyle} onClick={openAssignment} style={{cursor:"pointer"}}>
               Assignments
        </div>
        <div className={classes.itemStyle} onClick={openCourseMaterial} style={{cursor:"pointer"}}>
               Course Material
        </div>
        <div className={classes.itemStyle} onClick={openQuizzes} style={{cursor:"pointer"}}>
               Quizzes
        </div>
    </div>  
    { isAssignment && <AssignmentPage cid={cid} func={updateAssignment} assignments={assignments}/>}
     { isCourseMaterial && <CourseMaterial func={updateMaterial} cid={cid} material={material}/>}
     { isQuizzes && <QuizPage/>}
     <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={addModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent style={{width : "100%"}}>
              <DialogContentText id="alert-dialog-description">
                <center>
                  <br/>
                  
                    
                  
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={styles.addPersonal}>
               
      <DatePicker
        label="Date of class"
        value={startDate}
        onChange={(newValue) => {
          setStartDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <br></br>
      <br></br>
</div>

         </LocalizationProvider>
         {formErrors.date && (
            <center><span className={styles.error}>{formErrors.date}</span></center>
        )}
 
                <br/>
                <div style={{display : "flex"}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div>
                <TimePicker
        label="Start Time"
        value={startTime}
        onChange={(newValue) => {
          setStartTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <br></br>
      {formErrors.start && (
            <center><span className={styles.error}>{formErrors.start}</span></center>
      )}
      </div>
 
</LocalizationProvider>
 
<div style={{marginRight : "20px"}}></div>
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <div>
                <TimePicker
        label="End Time"
        value={endTime}
        onChange={(newValue) => {
          setEndTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <br></br>
      {formErrors.end && (
            <center><span className={styles.error}>{formErrors.end}</span></center>
        )}
        </div>
</LocalizationProvider>
 
</div>
    <br/>
          <br/>
              <Button 
              onClick={checkFunc}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              Schedule
            </Button>
            </center>
              </DialogContentText>
            </DialogContent>
            </Dialog>

     </div>
  );
}

export default CoursePage;
