import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";

class MyNavbar extends React.Component {
  render() {
    return (
      
      <Navbar collapseOnSelect 
      bg="light" 
      expand="md" className="shadow justify-content-md-around"
      fixed="top">
          <Navbar.Brand>SpaceX Fanpage</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="flex-grow-0">
            <Nav >
              <Nav.Link eventKey={1}
              as={Link} to="/home">Home</Nav.Link>
              <Nav.Link eventKey={2}
              as={Link} to="/home">About</Nav.Link>
              <Nav.Link eventKey={3}
              as={Link} to="/home">Upcoming Launches</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default MyNavbar;
