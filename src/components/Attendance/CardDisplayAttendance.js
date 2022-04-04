import React from 'react';
import Card from 'react-bootstrap/Card';

function CardDisplayAttendance(props){
    return (
        <div>
<Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{props.courseName}</Card.Title>
    <Card.Text>
      <p>{props.attendance}</p>
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
        </div>
    );
}

export default CardDisplayAttendance;