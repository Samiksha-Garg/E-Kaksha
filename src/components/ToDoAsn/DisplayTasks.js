import React , {useState , useEffect , useContext} from "react" ;
import CardDisplay from "./CardDisplay";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TopNavbar from "../Navigation/topNavbar";
import styles from "../../styles/assignments.module.css"

function DisplayTasks(props){
    const [todoAsn , setTodoAssignments] = useState(props.todoAssignments);
    const [missedAsn , setMissedAssignments] = useState(props.missedAssignments);
    const [completedAsn , setCompletedAssignments] =useState(props.completedAssignments);
    const [todoQuiz , setTodoQuizzes] = useState(props.todoQuizzes);
    const [missedQuiz , setMissedQuizzes] = useState(props.missedQuizzes);
    const [completedQuiz , setCompletedQuizzes] =useState(props.completedQuizzes);
    const [selectedCourse , setSelectedCourse] = useState("");
    const [selectedDate , setSelectedDate] = useState();

    useEffect(() => {

      setTodoAssignments(props.todoAssignments);
      setCompletedAssignments(props.completedAssignments);
      setMissedAssignments(props.missedAssignments);
      setTodoQuizzes(props.todoQuizzes);
      setMissedQuizzes(props.missedQuizzes);
      setCompletedQuizzes(props.completedQuizzes)
     }, [props.todoAssignments, props.missedAssignments, props.completedQuizzes, props.completedAssignments, props.todoQuizze, props.missedQuizzes])

    const SelectCourse=e=>{
      setSelectedCourse(e.target.value.toString());
      let sCourse = e.target.value;

      let sDate = new Date(selectedDate);

      if (sCourse == '') {
        setCompletedAssignments(props.completedAssignments);
        setMissedAssignments(props.missedAssignments);
        if (sDate == 'Invalid Date') {
          setTodoAssignments(props.todoAssignments);
          setTodoQuizzes(props.todoQuizzes);
        } else {
          setTodoAssignments(props.todoAssignments.filter( ele => ele.deadline.setHours(0,0,0)===sDate.setHours(0,0,0)));
          setTodoQuizzes(props.todoQuizzes.filter( ele => ele.start.setHours(0,0,0)===sDate.setHours(0,0,0)));
        }
        setMissedQuizzes(props.missedQuizzes);
        setCompletedQuizzes(props.completedQuizzes)
        return;
      }

      let missedAss = props.missedAssignments;
      let missedQ = props.missedQuizzes;
      let compAss = props.completedAssignments;
      let compQ = props.completedQuizzes;
      let todoA = props.todoAssignments;
      let todoQ = props.todoQuizzes;

      if (sDate == "Invalid Date") {
        setTodoAssignments(todoA.filter( ele => ele.cid===sCourse));
        setTodoQuizzes(todoQ.filter( ele => ele.cid===sCourse));
      } else {
        setTodoAssignments(todoA.filter( ele => ele.cid===sCourse && ele.deadline.setHours(0,0,0)===sDate.setHours(0,0,0)));
        setTodoQuizzes(todoQ.filter( ele => ele.cid===sCourse && ele.start.setHours(0,0,0)===sDate.setHours(0,0,0)));
      }
     
      setMissedAssignments(missedAss.filter( ele => ele.cid===sCourse));
      setCompletedAssignments(compAss.filter( ele => ele.cid===sCourse));
      setMissedQuizzes(missedQ.filter( ele => ele.cid===sCourse));
      setCompletedQuizzes(compQ.filter( ele => ele.cid===sCourse));
    }

    const SelectDate=e=>{
      setSelectedDate(e.target.value);
      let sCourse = selectedCourse;
      
      let sDate = new Date(e.target.value);
      if (sDate == "Invalid Date") {
        if (sCourse == '') {
          setTodoAssignments(props.todoAssignments);
          setTodoQuizzes(props.todoQuizzes);
        } else {
          setTodoAssignments(props.todoAssignments.filter( ele => ele.cid===sCourse));
          setTodoQuizzes(props.todoQuizzes.filter( ele => ele.cid===sCourse));
        }
        
        return;
      }

      if (sCourse == '') {
        setTodoAssignments(props.todoAssignments.filter( ele => ele.deadline.setHours(0,0,0)===sDate.setHours(0,0,0)));
      setTodoQuizzes(props.todoQuizzes.filter( ele => ele.start.setHours(0,0,0)===sDate.setHours(0,0,0)));
      } else {
        setTodoAssignments(props.todoAssignments.filter( ele => ele.deadline.setHours(0,0,0)===sDate.setHours(0,0,0) && ele.cid===sCourse));
        setTodoQuizzes(props.todoQuizzes.filter( ele => ele.start.setHours(0,0,0)===sDate.setHours(0,0,0) && ele.cid===sCourse));
      }
      
      
  }
    return(
        <div className={styles.outerBody}>
          <TopNavbar/>
          <div style={{height : "30vh"}}>
          <center>
            <div className = {styles.container}>
           <h6>Filter By Course</h6>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="courseId">Course</InputLabel>
        <Select
          labelId="courseId"
          id="courseId-dropdown"
          value={selectedCourse}
          label="Course"
          onChange={SelectCourse}
        >
          <MenuItem name="" value="">
            <em>None</em>
          </MenuItem>
          {props.courses.map((event) => {
          return <MenuItem name={event.name} value={event.cid}> {event.name} </MenuItem>;
        })} 
        </Select>
      </FormControl>
      </div>
          <hr></hr></center>
          <div className={styles.container}>
          <h6 style={{marginRight : "10px"}}>Filter TODOs By Date</h6>
          <input type="date" value={selectedDate} onChange={SelectDate} ></input>
          </div>
          <center><hr></hr></center>
          </div>

          <div className={styles.view}>

<div>
          <center><p>TODO</p></center>
        {todoAsn.map((event) => {
          return <CardDisplay type={event.type} cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        {todoQuiz.map((event) => {
          return <CardDisplay  type={event.type} cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        </div>

        <div>

        <center><p>Missed</p></center>
        {missedAsn.map((event) => {
          return <CardDisplay  type={event.type} cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        {missedQuiz.map((event) => {
          return <CardDisplay  type={event.type} cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })}   
        </div>
        <div>
        <center><p>Completed</p></center>
        {completedAsn.map((event) => {
          return <CardDisplay type={event.type}  cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        {completedQuiz.map((event) => {
          return <CardDisplay type={event.type} cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        </div>
        </div>
      
      </div>    
    );
}

export default DisplayTasks;
