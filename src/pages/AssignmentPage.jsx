import { useEffect, useState, useContext} from "react";
import AssignmentElement from "./AssignmentElement";
import classes from "./CoursePage.module.css";
import { Context } from "../context/Context";
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import ReactFileReader from 'react-file-reader';
import styles from "../styles/Calendar.module.css"
import axios from "axios";

function AssignmentPage(props){
  const {user} = useContext(Context)
  const [assign, setAssign] = useState(props.assignments);
  const [modal, setModal] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState('');
  const [fileName, setName] = useState('');
  const [file, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (!title) {
      errors.title = "Title Can't be empty"
    }

    if (!endDate) {
      errors.end = "End Date Can't be empty";
    } else {
      var today = new Date();
        if ( today > endDate) {
          errors.end = "Invalid End Date";
        }
    }

    if (!file) {
      errors.file = "No File Choosen";
    }

    return errors;
  };

  useEffect(() => {
    setAssign(props.assignments);
  },[props])

  

  const handleTitleChange = (e) => {
    const {value } = e.target;
    setTitle(value);
  }

  const handleFiles = async (files) => {
    setName(files.fileList[0].name);
     setFile(files.base64);
  }

  const handleClose = () => {
    setModal(false);
    setFile();
    setName('');
    setTitle('');
    setEndDate();
  }

  const submitForm = async() => {
    var today = new Date();
    const doc = {
      title : title,
      link : file,
      deadline : endDate,
      issueDate : today,
      courseId : props.cid
    }

    const response = await axios.post("/assignment", doc);
    props.func(response.data);
    handleClose();
  }

    return(
      <div>
        {assign.length == 0 && 
         <center> <p>No Assignments!</p></center>
        } 
        {assign.length != 0 && assign.map((event) => {
          return <AssignmentElement key={event._id} update ={props.func} sub ={event.submissions} title = {event.title} link = {event.link} assignId = {event._id} issueDate = {event.issueDate} deadline = {event.deadline}/>;
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
        
            <DialogContent style={{width : "100%", backgroundColor : "#fcc8bd"}}>
              <DialogContentText id="alert-dialog-description">
                <center>
                  <br/>
                  
                    <div style={{width : "100vw"}}></div>
                  
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* <div className={styles.addPersonal}> */}
                <div>
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
                
    <TextField id="title" label="Title" variant="standard" value={title} onChange={handleTitleChange} />
    {formErrors.title && (
            <center><span className={styles.error}>{formErrors.title}</span></center>
            )}
          <br/>
          <br/>
          <ReactFileReader fileTypes={[".pdf"]} base64={true} handleFiles={handleFiles}>
          <button style={{border : "solid 1px"}} className='btn'>Upload PDF</button>
        </ReactFileReader>
        {file && <center><span>{fileName}</span></center>}
        {(<center><span className={styles.error}>{formErrors.file}</span></center>
            )}
              <Button
              onClick={checkFunc}
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
    )
}

export default AssignmentPage;