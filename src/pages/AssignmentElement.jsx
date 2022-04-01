import React from "react";
import { useState, useContext, useEffect } from "react";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import { Context } from "../context/Context";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Sample from "../PdfView/Sample";
import styles from "./assign.module.css";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


function AssignmentElement(props) {
  const { user } = useContext(Context);

  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [issue, setIssue] = useState(new Date(props.issueDate));
  const [deadline, setDeadline] = useState(new Date(props.deadline));
  const [submitted, setSubmitted] = useState(false);
  const [ques, setQues] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [subArray, setSubArray] = useState([]);

  useEffect(() => {
    for (let i = 0; i < props.sub.length; i++) {
      if (props.sub[i].student == user._id) {
        setFile(props.sub[i].file);
        setSubmitted(true);
        return;
      }
    }
  }, [props.sub]);
  useEffect(async () => {
    let Subarr = [];
    for (let i = 0; i < props.sub.length; i++) {
      const res = await axios.get("/auth/" + props.sub[i].student);
      Subarr.push({
        stuName: res.data.name,
        stuEmail: res.data.email,
        stuId: props.sub[i].student,
        stuFile: props.sub.file,
      });
    }
    setSubArray(Subarr);
  }, [props.assignId]);

  const handleFiles = async (files) => {
    const response = await axios.put(
      "/assignment/submission/" + props.assignId,
      {
        student: user._id,
        file: files.base64,
      }
    );
    props.update(response.data);
    // setFile(files.base64);
  };

  const handleView = () => {
    setModal(true);
  };

  const ViewSubmissions = () => {
    setSubModal(true);
  };

  const openPDF = () => {
    setQues(true);
  };
  
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
          setModal(false);
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
                position: "absolute",
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
            <Sample file={file} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div>
        <h5>{props.title}</h5>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "10px" }}>Assignment : </p>
            <button onClick={openPDF} style={{ padding: "5px" }}>
              View PDF
            </button>
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
        >
          {user.role == "student" && (
            <>
              {!submitted && (
                <ReactFileReader
                  fileTypes={[".pdf"]}
                  base64={true}
                  handleFiles={handleFiles}
                >
                  <button className="btn">Upload</button>
                </ReactFileReader>
              )}

              {submitted && (
                <btn className={styles.btnn} onClick={handleView}>
                  View Submission
                </btn>
              )}
            </>
          )}
          {user.role == "teacher" && (
            <btn className={styles.btnn} onClick={ViewSubmissions}>
              View Submissions
            </btn>
          )}
        </div>
        <Dialog
          fullScreen
          open={subModal}
          onClose={() => {
            setSubModal(false);
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setSubModal(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Assignment: {props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {subArray.map((event) => {
              return (
                <div>
                  <ListItem >
                    <ListItemText
                      primary={event.stuName}
                      secondary={event.stuEmail}
                    />
                    <Button variant="outlined" onClick={openPDF}>
                      View Pdf
                    </Button>
                    
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </Dialog>

        <Dialog
          PaperProps={{
            style: {
              overflow: "visible",
            },
          }}
          onClose={() => {
            setQues(false);
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
                  position: "absolute",
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
              <Sample file={props.link} />
              {/* <div className={styles.error}>{authError}</div> */}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AssignmentElement;
