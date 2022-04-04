import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from "../assign.module.css"
import Modal from "../../components/TakeQuiz/Modal";
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
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

function QuizElement(props){

  const {user} = useContext(Context);
  const [modal, setModal] = useState(false);
  const [subArray, setSubArray] = useState([]);
  const [subModal, setSubModal] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [resultModal, setResultModal] = useState(false);
  const [result, setResult] = useState({});
  
  let date = new Date(props.date);
  const showQuestions = () => {
      setModal(true);
  }



  useEffect(async () => {

    let mMark = 0;

    props.question.map((ele) =>{
      mMark += parseInt(ele.marks);
    });
    setTotalMarks(mMark);

    let Subarr = [];
    for (let i = 0; i < props.sub.length; i++) {
      const res = await axios.get("/auth/" + props.sub[i].student);
      Subarr.push({
        stuName: res.data.name,
        stuEmail: res.data.email,
        stuId: props.sub[i].student,
        result : props.sub[i].result,
        marks : props.sub[i].marks
      });
    }
    setSubArray(Subarr);
  }, [props.quizId]);

  const viewAttempts = () => {
    setSubModal(true);
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

    <btn className={styles.btnn} onClick={viewAttempts}>View Attempts</btn>
</div>
      
      {/* Dialog to see quiz questions*/}
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

         {/* Dialog to see quiz submissions*/}

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
                Quiz: {props.title}
                <br></br>
                Total Marks : {totalMarks}
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
                      secondary={<div> 
                        {event.stuEmail}
                        <p>Marks : {event.marks}</p>
                      </div>}
                    />
                    <Button variant="outlined" value={event.result} onClick={() => {
                      setResult(event.result);
                      setResultModal(true);
                    }}>
                      View Answers
                    </Button>
                    
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </Dialog>

        <Dialog
    
          open={resultModal}
          onClose={() => {
            setResultModal(false);
          }}
        >
            <Modal 
            isTeacher={true}
        onClose={() => setResultModal(false)}
        onOpen={() => setResultModal(true) }
        results={result}
        data={props.question}
        
      />
        </Dialog>
    </div>
  </div>
 );

}

export default QuizElement;