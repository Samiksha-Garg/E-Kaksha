import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from "../assign.module.css"

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import Questions from "./questions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Display from "../../components/TakeQuiz/Dispaly";
import End from "../../components/TakeQuiz/End";
import Modal from "../../components/TakeQuiz/Modal";

function QuizStudentElement(props){

  const {user} = useContext(Context);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false)
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [markModal, setMarkModal] = useState(false);
//   console.log(props.quizId);
  useEffect(() => {
    for (let i = 0; i < props.sub.length; i++) {
      if (props.sub[i].student == user._id) {
        setResult(props.sub[i].result);
        setSubmitted(true);
        return;
      }
    }
  }, [props.sub]);

  let date = new Date(props.date);

  const handleUpdate = () => {
      props.reload();
      setModal(false);
  }

  const makeSubmission = () => {
      let today = new Date();
      let time = new Date(props.date);
      time.setMinutes(time.getMinutes() + parseInt(props.duration));

      if (today >= date && today <= time) {
            setModal(true);
      } else {
          setError(true);
      }
      
  }

  const viewSubmission = () => {
      setMarkModal(true);
  }
 
  return (
    <div
    style={{
      backgroundColor: "slategrey",
      padding: "25px 25px",
      margin: "20px 50px",
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <b style={{ marginRight: "10px" }}>Quiz : {props.title} </b>
        </div>
        <p>Description : {props.desc}</p>
        <p>Start Date and Time : {date.toString()}</p>
        <p>Duration : {props.duration.toString() + " mins"}</p>
      </div>
      <div
        style={{
          width: "150px",
          textAlign: "center",
          backgroundColor: "white",
          padding: "5px",
          float: "right",
        }}
      >
            {!submitted && (
                   <Button variant="outlined" onClick={makeSubmission}>
                        Make Submission
                 </Button>
            )}

            {submitted && (
              <Button variant="outlined" onClick={viewSubmission}>
                    View submission
              </Button>
            )}
         {/* Dialog to give quiz */}
         <Dialog
          fullScreen
          open={modal}
          onClose={() => {
            setModal(false);
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Quiz: {props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <center>
          <Display update={props.update} handleUpdate={handleUpdate} setModal={setModal} quizId = {props.quizId}/>
          </center>
        </Dialog>
        {/* Dialog for Error*/}
        <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={() => {setError(false)}}
            open={error}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
            <div>
        <center>Error</center>
        <IconButton
          aria-label="close"
          onClick={() => setError(false)}
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
                <div className={styles.error}>Either the quiz has expired or hasn't begin yet!</div>
              </DialogContentText>
            </DialogContent>
          </Dialog>


           {/* Dialog for Marks*/}

          <Dialog
          fullScreen
          open={markModal}
          onClose={() => {
            setMarkModal(false);
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMarkModal(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Quiz: {props.title}
              </Typography>
            </Toolbar>
          </AppBar>
         <End 
         isNew={false}
        results={result}
        data={props.question}
        onAnswersCheck={() => setResultModal(true)}
        />
        </Dialog>
        

         {/* Dialog for Check Answers*/}
        
        <Dialog
    
          open={resultModal}
          onClose={() => {
            setResultModal(false);
          }}
        >
            <Modal 
        onClose={() => setResultModal(false)}
        onOpen={() => setResultModal(true) }
        results={result}
        data={props.question}
        
      />
        </Dialog>
         
         
      </div>
      </div>
      </div>
 );

}

export default QuizStudentElement;