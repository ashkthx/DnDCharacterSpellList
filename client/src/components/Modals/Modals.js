import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../../utils/API.js";

/*
props.showAuth
props.showChar

props.authCallback
props.handleCharSubmit
*/

class Modals extends Component {
   state = {
      // Auth inputs
      type: "", // "login" displays the login modal, "signup" displays the sign up modal
      name: "",
      email: "",
      password: "",
      confirm: "",

      // Character inputs
      characterName: "",
      characterRace: "",
      characterClass: "",
      characterLevel: "",

      errorMessage: ""
   };

   handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   handleClose = modalName => {
      this.setState({ [modalName]: !this.state[modalName] });
   };

   // Signup button
   handleAuthSubmit = event => {
      event.preventDefault();
      if (this.state.type === "Sign Up") {
         if (!this.state.name.trim() || !this.state.email.trim() || !this.state.password || !this.state.confirm) {
            return this.setState({ errorMessage: "Please fill in all fields" });
         }
         if (this.state.password !== this.state.confirm) {
            return this.setState({
               errorMessage: "Passwords do not match",
               password: "",
               confirm: ""
            });
         }

         const { name, email, password } = this.state;
         const userObj = { name, email, password };
         API.userSignup(userObj)
            .then(this.props.authCallback)
            .catch(err => {
               this.setState({
                  // err.response.data comes from api-routes.js
                  errorMessage: err.response.data,
                  email: ""
               });
               console.log(err);
            });
      }
      else {
         // Check to make sure all fields are filled in
         if (!this.state.email || !this.state.password) {
            return this.setState({ errorMessage: "Please fill in all fields" });
         }

         const { email, password } = this.state;
         const userObj = { email, password };
         API.userLogin(userObj)
            .then(this.props.authCallback)
            .catch(err => {
               this.setState({
                  errorMessage: "Email or password is incorrect",
                  password: ""
               });
               console.log(err);
            });
      }
   };

   render() {
      return (
         <>
            {/* Auth Modal */}
            <Modal show={this.props.showAuth} onHide={() => this.handleClose("showAuth")}>
               <Modal.Header closeButton>
                  <Modal.Title>{this.state.type}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form onSubmit={this.props.handleAuthSubmit}>
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
                  <Button variant="secondary" onClick={() => this.handleClose("showAuth")}>
                     Close
               </Button>
                  <Button variant="dark" onClick={this.props.handleAuthSubmit}>
                     {this.state.type}
                  </Button>
               </Modal.Footer>
            </Modal>

            {/* Character Modal */}
            <Modal show={this.props.showChar} onHide={() => this.handleClose("showChar")}>
               <Modal.Header closeButton>
                  <Modal.Title>New {this.state.type}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form onSubmit={this.props.handleCharSubmit}>
                     <Form.Group controlId="formCharacterName">
                        <Form.Label>Character Name</Form.Label>
                        <Form.Control
                           name="characterName"
                           value={this.state.characterName}
                           onChange={this.handleInputChange}
                        />
                     </Form.Group>
                     <Form.Group controlId="formCharacterRace">
                        <Form.Label>Race</Form.Label>
                        <Form.Control
                           name="characterRace"
                           value={this.state.characterRace}
                           onChange={this.handleInputChange}
                        />
                     </Form.Group>
                     <Form.Group controlId="formCharacterClass">
                        <Form.Label>Class</Form.Label>
                        <Form.Control
                           name="characterClass"
                           value={this.state.characterClass}
                           onChange={this.handleInputChange}
                        />
                     </Form.Group>
                     <Form.Group controlId="formCharacterLevel">
                        <Form.Label>Level</Form.Label>
                        <Form.Control
                           name="characterLevel"
                           value={this.state.characterLevel}
                           onChange={this.handleInputChange}
                        />
                     </Form.Group>
                  </Form>
               </Modal.Body>
               <Modal.Footer>
                  {this.state.errorMessage && (
                     <div className="feedback">{this.state.errorMessage}</div>
                  )}
                  <Button variant="secondary" onClick={() => this.handleClose("showChar")}>
                     Close
               </Button>
                  <Button variant="dark" onClick={this.props.handleCharSubmit}>
                     Save
               </Button>
               </Modal.Footer>
            </Modal>
         </>
      );
   };
};

export default Modals;