import React from "react";
import Card from 'react-bootstrap/Card';

function Attendance() {
  return (
    <div>
      
      <Card style={{ width: "18rem", marginBottom: "1rem" }}>
        <Card.Body>
          <Card.Title>CourseName</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Classes
          </Card.Subtitle>
          <Card.Text>
            <span>
              Class
            </span>
            <button > View Attendance</button>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Attendance;
