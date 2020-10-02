import React from "react";
import { Card } from "react-bootstrap";

function LaunchItem(props) {
  return (
    <Card bg="light" className="shadow-big border-secondary" text="dark" >
      <Card.Body>
        <Card.Title as="h2" className="bg">{props.index + 1}. {props.launch.name}</Card.Title>
        <Card.Text>
          {props.launch.details ?
            props.launch.details :
            "Details not given yet"}
        </Card.Text>
      </Card.Body>
      <Card.Footer>{props.launch.stringDate}</Card.Footer>
    </Card>
  );
}

export default LaunchItem;
