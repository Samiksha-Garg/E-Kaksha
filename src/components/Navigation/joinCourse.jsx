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

export function JoinCourseTitle({setShowModal}) {
    return (<div>
         <center>Join Course</center>
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

export function JoinCourse({setShowModal}) {

    const {user} = useContext(Context);
    const [courseId, setCourseId] = useState('');
    const [isValid, setValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dbError, setdbError] = useState('');
    const [errorModal, setErrorModal] = useState(false);

    const handleChange = (e) => {
        const {value} = e.target;
        setCourseId(value)
    }

    const addToDatabase = () => {
        setIsSubmitting(true);

        let found = false;

        for (let id in user.courses) {
 
            if (user.courses[id] === courseId) {
                found = true;
                setdbError('Already enrolled in course');
                setErrorModal(true);
            }
        }

        if (!found) {
            setdbError('Invalid Course Id');
            setErrorModal(true);
        }

        
        setIsSubmitting(false);
    }

    const handleSubmit = (e) => {
        if(courseId == '') {
            setValid(false);
        } else {
            setValid(true);
            addToDatabase();
        }
    }

    return (<div style={{width : "300px"}}>
        <center>
        <TextField value={courseId} autoComplete="off" onChange={handleChange} id="standard-basic" label="Course Id" variant="standard" />
        <br></br>
        {!isValid && (
            <center><span className={styles.error}>Course Id Can't be blank</span></center>
            )}
        <Button onClick={handleSubmit}
            color="primary"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color : 'white'}}
            >
              Join Course
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