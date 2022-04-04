import AddQuestions from "./addQuestions";
import { useEffect, useState, useContext} from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
import classes from "../CoursePage.module.css";
import { Context } from "../../context/Context";
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import styles from "../../styles/Calendar.module.css";
import TimePicker from '@mui/lab/TimePicker';
import QuizElement from "./quizElement";
import DateTimePicker from '@mui/lab/DateTimePicker';


function QuizPage(props){

    const {user} = useContext(Context);
    const [modal, setModal] = useState(false);
    const [subModal, setSubModal] = useState(false);
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [desc, setDesc] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
      setQuiz(props.quiz);
    },[props.quiz])

    const handleClose = () => {
      setModal(false);
      setDate(null);
      setDesc('');
      setDuration('');
      setTitle('');
      setFormErrors({});
    }

    const handleDurationChange = (e) => {
      const re = /^[0-9\b]+$/;
      // if value is not blank, then test the regex
  
      if (e.target.value != '0' && (e.target.value === '' || re.test(e.target.value))) {
        setDuration(e.target.value)
      }
    }

    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
        submitForm();
      } else {
        setIsSubmitting(false);
      }
    }, [formErrors]);
  
    const checkFunc = () => {
      setFormErrors(validate());
      setIsSubmitting(true);
    }
  
    const validate = () => {
      let errors = {};

      if (!date) {
        errors.date = "Start Date and Time Can't be empty";
      }

      if (!duration) {
        errors.duration = "Duration Can't be empty";
      } 

      if (!desc) {
        errors.desc = "Description can't be empty"
      }

      if (!title) {
        errors.title = "Title can't be empty"
      }
      return errors;
    };

    const submitForm = () => {
      setIsSubmitting(false);
      setSubModal(true);
    }

 return <div>
   {quiz.length == 0 && 
         <center> <p>No Quizzes!</p></center>
        } 
        {quiz.length != 0 && quiz.map((event) => {
          return <QuizElement question={event.question} key={event._id} title = {event.title} date = {event.date} desc = {event.desc} duration = {event.duration}/>;
        })} 
    {user.role == "teacher" && <div onClick={() => {
          setModal(true);
        }} className={classes.add}>+</div>}

<Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            open={modal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent style={{width : "100%"}}>
              <DialogContentText id="alert-dialog-description">
                <center>
                  <br/>
                <TextField id="title" label="Title" variant="standard" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
               
          {formErrors.title && (
            <center><span className={styles.error}>{formErrors.title}</span></center>
      )}
                  <br/>
                  <br/>
                  <br/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
               
       <DateTimePicker
          label="Start Date And Time"
          value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
          renderInput={(params) => <TextField {...params} />}
        />
         </LocalizationProvider>
         {formErrors.date && (
            <center><span className={styles.error}>{formErrors.date}</span></center>
        )}
 
                <br/>
                <br/>
<TextField id="title" label="Duration (in mins)" variant="standard" value={duration} onChange={handleDurationChange}/>
    <br/>
    {formErrors.duration && (
            <center><span className={styles.error}>{formErrors.duration}</span></center>
      )}
          <br/>
          <TextField multiline rows='3' id="title" label="Description" variant="standard" value={desc} onChange={(e) => {setDesc(e.target.value)}}/>
          {formErrors.desc && (
            <center><span className={styles.error}>{formErrors.desc}</span></center>
      )}
          <br></br>
              <Button 
              onClick={checkFunc}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              ADD QUESTIONS
            </Button>
            </center>
              </DialogContentText>
            </DialogContent>
            </Dialog>
      
     <Dialog
          fullScreen
          open={subModal}
          onClose={() => {
            setSubModal(false);
          }}
        >
          <AddQuestions update={props.func} cid={props.cid} date ={date} duration={duration} title={title} desc={desc} setModal={setModal} setQuesModal={setSubModal}/>

        </Dialog>
 </div>
}
export default QuizPage;