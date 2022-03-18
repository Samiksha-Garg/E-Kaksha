import React from 'react';
import Card from 'react-bootstrap/Card';

function CardDisplay(props){
    return (
        <div>
<Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{props.course}</Card.Subtitle>
    <Card.Text>
      <p>{props.start}</p>
      <p>{props.deadline}</p>
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
        </div>
    );
}

export default CardDisplay;