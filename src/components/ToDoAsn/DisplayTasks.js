import React , {useState , useEffect , useContext} from "react" ;
import CardDisplay from "./CardDisplay";
// import Select from 'react-select'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function DisplayTasks(props){
    const [todoAsn , setTodoAssignments] = useState(props.todoAssignments);
    const [missedAsn , setMissedAssignments] = useState(props.missedAssignments);
    const [completedAsn , setCompletedAssignments] =useState(props.completedAssignments);
    const [todoQuiz , setTodoQuizzes] = useState(props.todoQuizzes);
    const [missedQuiz , setMissedQuizzes] = useState(props.missedQuizzes);
    const [completedQuiz , setCompletedQuizzes] =useState(props.completedQuizzes);
    const [selectedCourse , setSelectedCourse] = useState("");
    const [selectedDate , setSelectedDate] = useState(new Date());
    const [options, setOptions] = useState([])

    useEffect(() => {
      // let op = []
      // console.log(props.courses);
      // for (let i = 0; i < props.courses; i++) {
      //   op.push({
      //     value : props.coures[i]._id,
      //     label : props.coures[i].name
      //   })
      // }

      // setOptions(op);
      console.log(props.todoAssignments);

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

      if (sCourse == '') {
        setSelectedDate('');
        setTodoAssignments(props.todoAssignments);
        setCompletedAssignments(props.completedAssignments);
        setMissedAssignments(props.missedAssignments);
        setTodoQuizzes(props.todoQuizzes);
        setMissedQuizzes(props.missedQuizzes);
        setCompletedQuizzes(props.completedQuizzes)
        return;
      }
      
      let todoA=[];
      let missedA=[];
      let completedA=[];
      let todoQ=[];
      let missedQ=[];
      let completedQ=[];

      for(let i=0 ; i<props.todoAssignments.length ; i++){
        if(props.todoAssignments[i].cid=== sCourse){
          todoA.push(props.todoAssignments[i]);
        }
      }
      for(let i=0 ; i<props.missedAssignments.length ; i++){
        if(props.missedAssignments[i].cid=== sCourse){
          missedA.push(props.missedAssignments[i]);
        }
      }
      for(let i=0 ; i<props.completedAssignments.length ; i++){
        if(props.completedAssignments[i].cid===sCourse){
          completedA.push(props.completedAssignments[i]);
        }
      }
      for(let i=0 ; i<props.todoQuizzes.length ; i++){
        if(props.todoQuizzes[i].cid===sCourse){
          todoQ.push(props.todoQuizzes[i]);
        }
      }
      for(let i=0 ; i<props.missedQuizzes.length ; i++){
        if(props.missedQuizzes[i].cid===sCourse){
          missedQ.push(props.missedQuizzes[i]);
        }
      }
      for(let i=0 ; i<props.completedQuizzes.length ; i++){
        if(props.completedQuizzes[i].cid===sCourse){
          completedQ.push(props.completedQuizzes[i]);
        }
      }
      setTodoAssignments(todoA);
      setMissedAssignments(missedA);
      setCompletedAssignments(completedA);
      setTodoQuizzes(todoQ);
      setMissedQuizzes(missedQ);
      setCompletedQuizzes(completedQ);
    }

    const SelectDate=e=>{
      setSelectedDate(e.target.value);
      
      let sDate = new Date(e.target.value);
      if (sDate == "Invalid Date") {
        setTodoAssignments(props.todoAssignments);
        setTodoQuizzes(props.todoQuizzes);
        return;
      }

      let todoA=[];
      let todoQ=[];

      for(let i=0 ; i<props.todoAssignments.length ; i++){
        if(props.todoAssignments[i].deadline.setHours(0,0,0)===sDate.setHours(0,0,0)){
          todoA.push(props.todoAssignments[i]);
        }
      }
      for(let i=0 ; i<props.todoQuizzes.length ; i++){
        if(props.todoQuizzes[i].start.setHours(0,0,0) ===sDate.setHours(0,0,0)){
          todoQ.push(props.todoQuizzes[i]);
        }
      }
      setTodoAssignments(todoA);
      setTodoQuizzes(todoQ);
  }
    return(
        <div>
          <p>Filters</p>
          <center>
            <p>Filter By Course</p>
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
          <hr></hr></center>
          <p>Filter By Date</p>
          <input type="date" value={selectedDate} onChange={SelectDate} ></input>
          <hr></hr>  
          <center><p>TODO</p></center>
        {todoAsn.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        {todoQuiz.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        <hr></hr>
        <center><p>Missed</p></center>
        {missedAsn.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        {missedQuiz.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })}   
        <hr></hr>
        <center><p>Completed</p></center>
        {completedAsn.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
        {completedQuiz.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start.toString()} deadline={event.deadline.toString()} submissions={event.submissions}/>;
        })} 
      </div>    
    );
}

export default DisplayTasks;

