import React, {useState, useEffect, useContext} from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../../styles/SignUp.module.css'
import { Context } from '../../context/Context';

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@mui/material";

export function AddCourseTitle({setShowModal}) {
    return (<div>
         <center>Add Course</center>
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
    </div>)
}

export function AddCourse({setShowModal}) {

    const {user} = useContext(Context);
    const [courseName, setCourseName] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [isValidTitle, setValidTitle] = useState(true);
    const [isValidDesc, setValidDesc] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dbError, setdbError] = useState('');
    const [errorModal, setErrorModal] = useState(false);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
      

    const handleNameChange = (e) => {
        const {value} = e.target;
        setCourseName(value)
    }

    const handleDescChange = (e) => {
        const {value} = e.target;
        setCourseDesc(value)
    }

    const addToDatabase = () => {
        setIsSubmitting(true);
        let picNum = getRandomInt(9);

        // let found = false;

        // for (let id in user.courses) {
 
        //     if (user.courses[id] === courseId) {
        //         found = true;
        //         setdbError('Already enrolled in course');
        //         setErrorModal(true);
        //     }
        // }

        // if (!found) {
        //     setdbError('Invalid Course Id');
        //     setErrorModal(true);
        // }

        setIsSubmitting(false);
    }

    const handleSubmit = (e) => {
        if(courseName == '') {
            setValidTitle(false);
        } else {
            setValidTitle(true);
            if (courseDesc == '') {
                setValidDesc(false);
            } else {
                setValidDesc(true);
                addToDatabase();
            }
            
        }
    }

    return (<div style={{width : "300px"}}>
        <center>
        <TextField value={courseName} autoComplete="off" onChange={handleNameChange} id="standard-basic" label="Course Name" variant="standard" />
        <br></br>
        {!isValidTitle && (
            <center><span className={styles.error}>Course Name Can't be Blank</span></center>
            )}
            <br></br>
            <TextField value={courseDesc} autoComplete="off" onChange={handleDescChange}  multiline
          rows={4} id="standard-basic" label="Course Desc" variant="standard" />
        <br></br>
        {!isValidDesc && (
            <center><span className={styles.error}>Description Can't be Blank</span></center>
        )}
        <Button onClick={handleSubmit}
            color="primary"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              Add Course
        </Button>
        </center>
        <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={() => {
                setErrorModal(false);
            }}
            open={errorModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
            <div>
        <center>Error</center>
        <IconButton
          aria-label="close"
          onClick={() => setErrorModal(false)}
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
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className={styles.error}>{dbError}</div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          

    </div>)
}