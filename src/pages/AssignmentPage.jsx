import { useEffect, useState } from "react";
import AssignmentElement from "./AssignmentElement";

function AssignmentPage(props){
  const [assign, setAssign] = useState(props.assignments);

  useEffect(() => {
    setAssign(props.assignments);
  },[props])


    return(
      <div>
        {assign.map((event) => {
          return <AssignmentElement key={event._id} update ={props.func} sub ={event.submissions} title = {event.title} link = {event.link} assignId = {event._id} issueDate = {event.issueDate} deadline = {event.deadline}/>;
        })} 
      </div>
    )
}

export default AssignmentPage;