import { useState } from "react";

function AssignmentElement(props){
  const [issue,setIssue] = useState(new Date(props.issueDate));
  const [deadline, setDeadline] = useState(new Date(props.deadline));
 
  return (
    <div
    style={{
      backgroundColor: "slategrey",
      padding: "30px 30px",
      margin: "20px 50px",
      width: "1393px"
    }}
  >
    <div>
      <h5>{props.title}</h5>
    </div>
    <div style={{display:"flex", justifyContent : "space-between", alignItems : "center"}}>
      <div>
        <p>Assignment description  : {props.link}</p>
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
        <btn>Upload</btn>
      </div>
    </div>
  </div>
 );

}

export default AssignmentElement;