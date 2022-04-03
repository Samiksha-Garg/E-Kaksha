import { useEffect, useState, useContext} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import classes from "../CoursePage.module.css";
import QuesDialog from "./quesDialog";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
import styles from "../../styles/SignIn.module.css"



function AddQuestions(props) {

    const [quesModal, setQuesModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [errorModal, setErrorModal] = useState(false);

    const deleteQues = (e) => {
        let temp = questions;
        temp.splice(e.target.value, 1);
        setQuestions([...temp]);
    }

    const submitForm = (e) => {
        if (questions.length == 0) {
            setErrorModal(true);
        } else {
            props.setQuesModal(false);
        }
    }

    return <div>

<AppBar sx={{ position: "relative" }}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      onClick={() => props.setQuesModal(false)}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
      Questions
    </Typography>
  </Toolbar>
</AppBar>
{<div onClick={() => {
          setQuesModal(true);
        }} className={classes.add}>+</div>}
<List>
  {questions.map((event, index) => {
    return (
      <div>
        <ListItem >
          <ListItemText
            primary={"Q - " + event.question}
            secondary={
                <div>
                    <p>Option 1 - {event.option1}</p>
                    <p>Option 2 - {event.option2}</p>
                    <p>Option 3 - {event.option3}</p>
                    <p>Option 4 - {event.option4}</p>
                    <p>Correct Option : {event.correctOption} 
                    <br></br>
                         Marks : {event.marks}
                    </p>
                </div>
                }
          />
          <Button variant="outlined" value={index} onClick={deleteQues}>
            Delete
          </Button>
          
        </ListItem>
        <Divider />
      </div>
    );
  })}
</List>
<center>
<Button variant="outlined" onClick={submitForm}>
    SUBMIT
</Button>
</center>
<Dialog
fullWidth
          maxWidth = 'lg'
          open={quesModal}
          onClose={() => {
            setQuesModal(false);
          }}
        >
            <QuesDialog addQues={setQuestions} closeModal={setQuesModal}/>

        </Dialog>
        <Dialog
            PaperProps={{
              style: {
                overflow: "visible",
              },
            }}
            onClose={setErrorModal}
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
                <div className={styles.error}>No Questions added</div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
    </div>
}

export default AddQuestions;