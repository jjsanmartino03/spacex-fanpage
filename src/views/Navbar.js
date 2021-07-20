import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import brandLogo from "../resources/rocket-logo4.png";

class MyNavbar extends React.Component {
  // Navigation bar present in every view
  constructor(props) {
    super(props);
    this.state = { shadow: false };
    this.links = [
      // A list of every link to display in the Navbar
      { path: "/", text: "Home" },
      { path: "/upcoming", text: "Upcoming Launches" },
    ];
  }
  componentDidMount = () => {
    // Add scroll listener to show shadow
    window.addEventListener("scroll", this.handleScroll);
  };
  componentWillUnmount = () => {
    // Remove the listener once the component is unmounted
    window.removeEventListener("scroll", this.handleScroll);
  };
  handleScroll = (event) => {
    if (window.scrollY === 0) {
      // The user is at the top of the page
      this.setState({ shadow: false });
    } else if (!this.state.shadow) {
      // The user is not at the top and shadow is already being displayed
      this.setState({ shadow: true });
    }
  };
  render() {
    let currentLocation = this.props.currentLocation; // The location tells what link should be displayed as active
    return (
      <Navbar
        collapseOnSelect={true}
        expand="md"
        className={`${
          this.state.shadow ? "shadow-big" : ""
        } border-bottom justify-content-md-around`}
        sticky="top"
        bg="light"
      >
        <Container>
          <Navbar.Brand as={Link} to="">
            <img src={brandLogo} alt="brand logo" height="40" width="40" />{" "}
            SpaceX Fanpage
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-nav-navbar" />
          <Navbar.Collapse id="responsive-nav-navbar" className="flex-grow-0">
            <Nav className="justify-content-around">
              {this.links.map((val, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    className={currentLocation === val.path ? "activate" : ""}
                    as={Link}
                    to={val.path}
                    eventKey={val.path}
                  >
                    {val.text}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ navbarView }) => {
  return { ...navbarView }; // Necessary info to highlight current location
};

export default connect(mapStateToProps)(MyNavbar);
