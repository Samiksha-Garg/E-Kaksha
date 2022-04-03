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

function QuizPage(){

    const {user} = useContext(Context);
    const [modal, setModal] = useState(false);
    const [subModal, setSubModal] = useState(false);

 return <div>
    {user.role == "teacher" && <div onClick={() => {
          setModal(true);
        }} className={classes.add}>+</div>}

      
     <Dialog
          fullScreen
          open={subModal}
          onClose={() => {
            setSubModal(false);
          }}
        >
          <AddQuestions setQuesModal={setSubModal}/>

        </Dialog>
 </div>
}
export default QuizPage;