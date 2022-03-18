import React , {useState , useEffect , useContext} from "react" ;
import CardDisplay from "./CardDisplay";
import Select from 'react-select'

function DisplayTasks(props){
    const [todoAsn , setTodoAssignments] = useState(props.todoAssignments);
    const [missedAsn , setMissedAssignments] = useState(props.missedAssignments);
    const [completedAsn , setCompletedAssignments] =useState(props.completedAssignments);
    const [todoQuiz , setTodoQuizzes] = useState(props.todoQuizzes);
    const [missedQuiz , setMissedQuizzes] = useState(props.missedQuizzes);
    const [completedQuiz , setCompletedQuizzes] =useState(props.completedQuizzes);
    const [selectedCourse , setSelectedCourse] = useState(props.courses.name);
    const [selectedDate , setSelectedDate] = useState(new Date());
    console.log(selectedDate);
    const SelectCourse=e=>{
      setSelectedCourse(e.name);

      let todoA=[];
      let missedA=[];
      let completedA=[];
      let todoQ=[];
      let missedQ=[];
      let completedQ=[];

      for(let i=0 ; i<props.todoAssignments.length ; i++){
        if(props.todoAssignments[i].course===selectedCourse){
          todoA.push(props.todoAssignments[i]);
        }
      }
      for(let i=0 ; i<props.missedAssignments.length ; i++){
        if(props.missedAssignments[i].course===selectedCourse){
          missedA.push(props.missedAssignments[i]);
        }
      }
      for(let i=0 ; i<props.completedAssignments.length ; i++){
        if(props.completedAssignments[i].course===selectedCourse){
          completedA.push(props.completedAssignments[i]);
        }
      }
      for(let i=0 ; i<props.todoQuizzes.length ; i++){
        if(props.todoQuizzes.course===selectedCourse){
          todoQ.push(props.todoQuizzes[i]);
        }
      }
      for(let i=0 ; i<props.missedQuizzes.length ; i++){
        if(props.missedQuizzes[i].course===selectedCourse){
          missedQ.push(props.missedQuizzes[i]);
        }
      }
      for(let i=0 ; i<props.completedQuizzes.length ; i++){
        if(props.completedQuizzes[i].course===selectedCourse){
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

      let todoA=[];
      let todoQ=[];

      for(let i=0 ; i<props.todoAssignments.length ; i++){
        if(props.todoAssignments[i].deadline.toISOString.slice(0,10)===selectedDate.toISOString.slice(0,10)){
          todoA.push(props.todoAssignments[i]);
        }
      }
      for(let i=0 ; i<props.todoQuizzes.length ; i++){
        if(props.todoQuizzes.start.toISOString.slice(0,10)===selectedDate.toISOString.slice(0,10)){
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
          <Select options={props.courses.name} onChange={SelectCourse}></Select>
          <hr></hr></center>
          <p>Filter By Date</p>
          <input type="date" value={selectedDate} onChange={SelectDate} ></input>
          <hr></hr>  
          <center><p>TODO</p></center>
        {todoAsn.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start} deadline={event.deadline} submissions={event.submissions}/>;
        })} 
        {todoQuiz.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start} deadline={event.deadline} submissions={event.submissions}/>;
        })} 
        <hr></hr>
        <center><p>Missed</p></center>
        {missedAsn.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start} deadline={event.deadline} submissions={event.submissions}/>;
        })} 
        {missedQuiz.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start} deadline={event.deadline} submissions={event.submissions}/>;
        })}   
        <hr></hr>
        <center><p>Completed</p></center>
        {completedAsn.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start} deadline={event.deadline} submissions={event.submissions}/>;
        })} 
        {completedQuiz.map((event) => {
          return <CardDisplay cid={event.cid} course={event.course} quizid={event.assigid} title={event.title} start={event.start} deadline={event.deadline} submissions={event.submissions}/>;
        })} 
      </div>    
    );
}

export default DisplayTasks;


   
