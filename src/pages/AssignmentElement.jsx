import { useState, useContext, useEffect } from "react";
import ReactFileReader from 'react-file-reader';
import axios from "axios";
import { Context } from "../context/Context";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Sample from "../PdfView/Sample";
import styles from "./assign.module.css"
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
function AssignmentElement(props){

  const {user} = useContext(Context);

  const[modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [issue,setIssue] = useState(new Date(props.issueDate));
  const [deadline, setDeadline] = useState(new Date(props.deadline));
  const [submitted, setSubmitted] = useState(false);
  const [ques, setQues] = useState(false)
  

  useEffect(() => {
    for (let i = 0; i < props.sub.length; i++) {
      if (props.sub[i].student == user._id) {
        setFile(props.sub[i].file);
        setSubmitted(true);
        return;
      }
    }
  },[props.sub])

  const handleFiles = async (files) => {
    const response = await axios.put("/assignment/submission/" + props.assignId, {
      student : user._id,
      file : files.base64,
    });
    props.update(response.data);
    // setFile(files.base64);
  }

  const handleView = () => {
    setModal(true);
  }

  const ViewSubmissions = () => {
    
  }

  const openPDF = () => {
    setQues(true);
  }
 
  return (
    <div
    style={{
      backgroundColor: "slategrey",
      padding: "25px 25px",
      margin: "20px 50px",
    }}
  >
    <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={() => {
              setModal(false)
            }}
            open={modal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
            <div>
        <IconButton
          aria-label="close"
          onClick={() => setModal(false)}
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
                <Sample file = {file}/>
                {/* <div className={styles.error}>{authError}</div> */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
    <div>
      <h5>{props.title}</h5>
    </div>
    <div style={{display:"flex", justifyContent : "space-between", alignItems : "center"}}>
      <div>
        <div style={{display : "flex", alignItems : "center"}}>
          <p style={{marginRight : "10px"}}>Assignment : </p>
          <button onClick={openPDF} style={{padding : "5px"}}>View PDF</button>
        </div>
      <p>Issue Date : {issue.toString()}</p>
      <p>Deadline : {deadline.toString()}</p>
      </div>
      <div
        style={{
          width: "150px",
          textAlign: "center",
          backgroundColor: "white",
          padding: "5px",
          float: "right",
        }}
      >{user.role == "student" && <>
        {!submitted && <ReactFileReader fileTypes={[".pdf"]} base64={true} handleFiles={handleFiles}>
          <button className='btn'>Upload</button>
        </ReactFileReader>}

        {submitted 
          && <btn className={styles.btnn} onClick = {handleView}>View Submission</btn>
          }
          </>
      }
      {user.role == "teacher" && <btn className={styles.btnn} onClick = {ViewSubmissions}>View Submissions</btn>}
      </div>
      <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={() => {
              setQues(false)
            }}
            open={ques}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
 
            <DialogTitle id="alert-dialog-title">
            <div>
        <IconButton
          aria-label="close"
          onClick={() => setQues(false)}
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
                <Sample file = {props.link}/>
                {/* <div className={styles.error}>{authError}</div> */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          
    </div>
  </div>
 );

}

export default AssignmentElement;