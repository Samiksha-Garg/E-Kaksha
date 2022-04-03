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

function QuizElement(props){

  const {user} = useContext(Context);
  const [modal, setModal] = useState(false)
  
  let date = new Date(props.date);
  const showQuestions = () => {
      setModal(true);
  }
 
  return (
    <div
    style={{
      backgroundColor: "slategrey",
      padding: "25px 25px",
      margin: "20px 50px",
    }}
  >
 


    <div style={{display:"flex", justifyContent : "space-between", alignItems : "center"}}>
    <b style={{ marginRight: "10px" }}>{props.title}</b>
            <button onClick ={showQuestions} style={{ padding: "5px" }}>
              View Quiz
            </button>
        <div>
        <p>Description : {props.desc}</p>
        <p>Start Date and Time : {date.toString()}</p>
        <br></br>
        Duration : {props.duration}
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

    <btn className={styles.btnn} >View Attempts</btn>
</div>
      
<Dialog
          fullScreen
          open={modal}
          onClose={() => {
            setModal(false);
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setModal(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Quiz: {props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Questions questions={props.question}/>
        </Dialog> 
    </div>
  </div>
 );

}

export default QuizElement;