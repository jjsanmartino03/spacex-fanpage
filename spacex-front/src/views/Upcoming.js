import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import LaunchItem from "./components/LaunchItem";

class Upcoming extends React.Component{
  render = () => {
    return (
      <Container className="my-4 "  fluid="sm">
        <h1 className="text-center mb-4">Upcoming SpaceX Launches</h1>
        <Row fluid className="justify-content-around" sm={1} md={2} lg={4}>
          <LaunchItem/>
        </Row>
      </Container>
    )
  }
}

export default Upcoming;