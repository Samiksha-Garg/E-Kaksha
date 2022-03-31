import { padding } from "@mui/system";
import { useEffect, useState} from "react";
import TopNavbar from "../components/Navigation/topNavbar";
import classes from "./CoursePage.module.css";
import CourseMaterial from "./CourseMaterial";
import QuizPage from "./QuizPage";
import AssignmentPage from "./AssignmentPage";
import { Assignment } from "@mui/icons-material";
import { useParams } from "react-router";
import axios from "axios";

function CoursePage() {

    const[isAssignment,setAssignment]=useState(true);
    const[isCourseMaterial,setCourseMaterial]=useState(false);
    const[isQuizzes,setQuizzes]=useState(false);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuiz] = useState([]);
    const [material, setMaterial] = useState([]);

    const index = (newAssign) => {
      for (let i = 0; i < assignments.length; i++) {
        if (assignments[i]._id == newAssign._id) {
          return i;
        }
      }
    }

    const updateAssignment = (newAssign) => {
      let i = index(newAssign);
      let temp = assignments;
      temp[i] = newAssign;
      setAssignment(false);
      setAssignment(true);
      setAssignments(temp);
    }

    const { cid } = useParams();

    const openAssignment=()=>{setQuizzes(false);setAssignment(true);setCourseMaterial(false);}
    const openCourseMaterial=()=>{setQuizzes(false);setAssignment(false);setCourseMaterial(true);}
    const openQuizzes=()=>{setQuizzes(true);setAssignment(false);setCourseMaterial(false);}

    useEffect(async() => {
  
      const response1 = await axios.get("/assignment/courseid/"+ cid);
      const response2 = await axios.get("/quiz/courseid/" + cid);
      setAssignments(response1.data);
      setQuiz(response2.data);
    
    },[cid])
  return (
    <div style={{overflowX:"hidden",backgroundColor:"white",width:"100%"}}>
        <TopNavbar />
      <div
        style={{
          backgroundColor: "rgb(251,167,94)",
          padding: "30px 30px",
          margin: "20px 50px",
        }}
      >
        <div>
          <h2>Course Name!</h2>
        </div>
        <div>
          Meet Link :
          <a
            href="https://meet.google.com/"
            style={{ textTransform: "lowercase" }}
          >
            {" https://meet.google.com/ "}
          </a>
          
          <div
            style={{
              width: "150px",
              textAlign: "center",
              backgroundColor: "white",
              padding: "5px",
              float: "right",
            }}
          >
            <btn>Chat with Prof</btn>
          </div>
        </div>
      </div>
      <div style={{margin:"0px 50px",padding:"10px", backgroundColor:"slategrey",display:"flex"}} >
        <div className={classes.itemStyle} onClick={openAssignment} style={{cursor:"pointer"}}>
               Assignments
        </div>
        <div className={classes.itemStyle} onClick={openCourseMaterial} style={{cursor:"pointer"}}>
               Course Material
        </div>
        <div className={classes.itemStyle} onClick={openQuizzes} style={{cursor:"pointer"}}>
               Quizzes
        </div>
    </div>  
    { isAssignment && <AssignmentPage func={updateAssignment} assignments={assignments}/>}
     { isCourseMaterial && <CourseMaterial/>}
     { isQuizzes && <QuizPage/>}


      </div>
  );
}

export default CoursePage;
