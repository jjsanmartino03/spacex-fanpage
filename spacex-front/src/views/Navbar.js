import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../resources/navbar.css";
import brandLogo from "../resources/rocket-logo4.png";

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      { path: "/home", text: "Home" },
      { path: "/upcoming", text: "Upcoming Launches" },
      {path: "/about", text:"About"}
    ];
  }
  render() {
    let curLocation = this.props.history.location.pathname;
    return (
      <Navbar
        collapseOnSelect
        expand="md"
        className="shadow justify-content-md-around bg-rose-gray"
        sticky="top"
      >
        <Navbar.Brand>
          <img src={brandLogo} height="40" width="40" /> SpaceX Fanpage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-nav-navbar" />
        <Navbar.Collapse id="responsive-nav-navbar" className="flex-grow-0">
          <Nav
            defaultActiveKey={curLocation}
            className="justify-content-around"
          >
            {this.state.map((val, index) => (
              <Nav.Item>
                <Nav.Link
                  key={index}
                  eventKey={val.path}
                  as={Link}
                  to={val.path}
                >
                  {val.text}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default MyNavbar;
