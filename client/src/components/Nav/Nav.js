// Dependencies
import React, { Component } from "react";
import API from "../../utils/API.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { withRouter, Link } from "react-router-dom";
import "./Nav.css";

class Header extends Component {
  state = {

  };

  handleLogout = () => {
    API.userLogout()
      .then(response => {
        this.setState(
          {
            show: false,
            type: "",
            isLoggedIn: false,
            name: "",
            email: "",
            password: "",
            confirm: ""
          },
          () => this.props.history.push("/")
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  authCallback = () => {
    this.setState(
      {
        show: false,
        type: "",
        isLoggedIn: true,
        name: "",
        email: "",
        password: "",
        confirm: ""
      },
      () => this.props.history.push("/members")
    );
  };

  render() {
    return (
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/members" bsPrefix="navbar-brand">Spell Tracker</Navbar.Brand>
          {this.state.isLoggedIn ? (
            <Nav className="nav-links">
              <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>{" "}
            </Nav>
          ) : (
              <Nav className="nav-links">
                <Nav.Link onClick={() => this.handleOpen("Login")}>
                  Login
                </Nav.Link>
                <Nav.Link onClick={() => this.handleOpen("Sign Up")}>
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
        </Container>
      </Navbar>
    );
  }
}

// Export
export default withRouter(Header);
