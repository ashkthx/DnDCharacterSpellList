import React, { Component } from "react";
import API from "../../utils/API.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Nav.css";

class Header extends Component {
  state = {
    show: false,
    type: "", // "login" displays the login modal, "signup" displays the sign up modal

    // Form inputs
    email: "",
    password: "",
    confirm: ""
  };

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value }, () => console.log(this.state[name]));
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = type => {
    this.setState({
      show: true,
      type: type
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.type === "Sign Up") {
        if (this.state.password !== this.state.confirm) {
            console.log("Passwords do not match")
            this.setState({
                password: "",
                confirm: ""
            })
        } else
        API.userSignup(this.state).then(response => {
            console.log(response.data);
            this.setState({ isLoggedIn: true });
        }).catch(err => {
            console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.handleOpen("Login")}>Login</Nav.Link>
            <Nav.Link onClick={() => this.handleOpen("Sign Up")}>
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control name = "email" value={this.state.email} onChange={this.handleInputChange} type="email" placeholder="Enter Email" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Password" />
              </Form.Group>
              {this.state.type === "Sign Up" && (
                <Form.Group controlId="formGroupConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control name="confirm" value={this.state.confirm} onChange={this.handleInputChange} type="password" placeholder="Confirm Password" />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleFormSubmit}>
              {this.state.type}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Header;
