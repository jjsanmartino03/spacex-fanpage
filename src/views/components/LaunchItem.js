import { Button, Collapse } from "react-bootstrap";
import React from "react";
import { Card, Col } from "react-bootstrap";

function LaunchItem(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Col className="mb-3 px-2">
      <Card bg="light" className=" shadow-big border-secondary" text="dark">
        <Card.Body>
          <Card.Title as="h2" className="bg">
            {props.index + 1}. {props.launch.name}
          </Card.Title>
          <Collapse in={open}>
            <Card.Text>{props.launch.details}</Card.Text>
          </Collapse>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between w-full w-100">
          <span>{props.launch.stringDate}</span>
          {props.launch.details ? (
            <Button onClick={() => setOpen((open) => !open)} variant="info">
              {!open ? "Show more" : "Show less"}
            </Button>
          ) : (
            <span className="text-warning">No details available</span>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default LaunchItem;
