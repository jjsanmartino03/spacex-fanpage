import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import brandLogo from "../resources/rocket-logo4.png";
import {connect} from "react-redux";

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shadow:false}
    this.links = [
        { path: "/upcoming", text: "Upcoming Launches" },
      ];
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = (event) =>{
    if (window.scrollY === 0){
      this.setState({shadow:false});
    }
    else if(!this.state.shadow) {
      this.setState({shadow:true});
    }
  }
  render() {
    let currentLocation = this.props.currentLocation;
    return (
      <Navbar
        collapseOnSelect={true}
        expand="md"
        className={`${this.state.shadow? "shadow-big": ""} border-bottom justify-content-md-around`}
        sticky="top"
        bg="light"
      >
        <Navbar.Brand>
          <img src={brandLogo} alt="brand logo" height="40" width="40" /> SpaceX Fanpage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-nav-navbar" />
        <Navbar.Collapse id="responsive-nav-navbar" className="flex-grow-0">
          <Nav
            className="justify-content-around"
          >
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
      </Navbar>
    );
  }
}

const mapStateToProps = ({navbarView}) =>{
    return {...navbarView};
}

export default connect(mapStateToProps)(MyNavbar);
