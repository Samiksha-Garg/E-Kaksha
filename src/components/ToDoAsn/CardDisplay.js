import React from 'react';
import Card from 'react-bootstrap/Card';

function CardDisplay(props){
    return (
        <div>
<Card style={{ width: '18rem' , marginBottom : "1rem"}}>
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{props.course}</Card.Subtitle>
    <Card.Text>
      <p>{props.type == "assignment" ? 'Issue : ' : 'Start : '}{props.start}</p>
      <p>{props.type == "assignment" ? 'Deadline : ' : 'Duration in Hours : '}{props.deadline}</p>
    </Card.Text>
  </Card.Body>
</Card>
        </div>
    );
}

export default CardDisplay;