// Dependencies
import React, { Component } from "react";
import API from "../../utils/API.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { withRouter, Link } from "react-router-dom";
import "./Nav.css";

class Header extends Component {
  state = {
    show: false,
    type: "", // "login" displays the login modal, "signup" displays the sign up modal
    isLoggedIn: false,

    // Form inputs
    name: "Ashley",
    email: "ash@ash.com",
    password: "asdf",
    confirm: "",

    // Validate
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    API.userIsLoggedIn().then((response) => {
      this.setState({
        isLoggedIn: response.data
      });
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state[name]));
  };

  // Closing the modal
  handleClose = () => {
    this.setState({
      show: false,
      errorMessage: null
    });
  };

  // Opening the modal
  handleOpen = type => {
    this.setState({
      show: true,
      type: type
    });
  };

  // Signup button
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.type === "Sign Up") {
      if (
        !this.state.name ||
        !this.state.email ||
        !this.state.password ||
        !this.state.confirm
      ) {
        return this.setState({ errorMessage: "Please fill in all fields" });
      }
      if (this.state.password !== this.state.confirm) {
        this.setState({
          errorMessage: "Passwords do not match",
          password: "",
          confirm: ""
        });
      } else
        API.userSignup(this.state)
          .then(response => {
            console.log(response.data);
            this.setState(
              {
                show: false,
                type: "",
                isLoggedIn: true,
                name: "",
                email: "",
                password: "",
                confirm: "",
                submitted: false
              },
              () => this.props.history.push("/members")
            );
          })
          .catch(err => {
            this.setState({ 
              // err.response.data comes from api-routes.js
              errorMessage: err.response.data,
              email: ""
            });
            console.log(err);
          });
    } else {
      // Check to make sure all fields are filled in
      if (!this.state.email || !this.state.password) {
        return this.setState({ errorMessage: "Please fill in all fields" });
      }
      API.userLogin(this.state)
        .then(response => {
          console.log(response.data);
          this.setState(
            {
              show: false,
              type: "",
              isLoggedIn: true,
              name: "",
              email: "",
              password: "",
              confirm: "",
              submitted: false
            },
            () => this.props.history.push("/members")
          );
        })
        .catch(err => {
          this.setState({ 
            errorMessage: "Email or password is incorrect",
            password: ""
          });
          console.log(err);
        });
    }
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
            confirm: "",
            submitted: false
          },
          () => this.props.history.push("/")
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
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

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit}>
              {this.state.type === "Sign Up" && (
                <Form.Group controlId="formGroupName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    type="name"
                    placeholder="Enter Your Name"
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              {this.state.type === "Sign Up" && (
                <Form.Group controlId="formGroupConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="confirm"
                    value={this.state.confirm}
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {this.state.errorMessage && (
              <div className="feedback">{this.state.errorMessage}</div>
            )}
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={this.handleFormSubmit}>
              {this.state.type}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Export
export default withRouter(Header);
