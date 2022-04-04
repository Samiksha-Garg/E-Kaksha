import React from 'react';
import Card from 'react-bootstrap/Card';

function CardDisplayAttendance(props){

  let total = parseInt(props.totalAttendance);
  let att = parseInt(props.attendance);
    return (
        <div>
<Card style={{ width: '18rem', marginBottom : "10px" }}>
  <Card.Body>
  <div style={{fontSize : "1.2rem"}}><b>{props.courseName}</b></div>  
    <Card.Text>
      <p>Attended Classes : {props.attendance}</p>
      <p>Total Classes : {props.totalAttendance}</p>
      <p>Percentage : {total == 0 ? 100 : att / total} %</p>
    </Card.Text>
  </Card.Body>
</Card>
        </div>
    );
}

export default CardDisplayAttendance;