import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormComplete from "../FormComplete"
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
      if (this.props.type === "Sign Up") {
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
            .then(({ data }) => {
               this.setState({
                  name: "",
                  email: "",
                  password: "",
                  confirm: ""
               }, () => {
                  const stateObj = { showAuth: false, isLoggedIn: true, name: data.name };
                  if (this.props.newCharConfirm) {
                     stateObj.showChar = true;
                     this.props.updateAppState(stateObj);
                  }
                  else {
                     this.props.updateAppState(stateObj);
                     this.props.history.push("/members");
                  }
               });
            })
            .catch(err => {
               console.log(err.response);
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
            .then(({ data }) => {
               this.setState({
                  name: "",
                  email: "",
                  password: "",
                  confirm: ""
               }, () => {
                  const stateObj = { showAuth: false, isLoggedIn: true, name: data.name };
                  if (this.props.newCharConfirm) {
                     stateObj.showChar = true;
                     this.props.updateAppState(stateObj);
                  }
                  else {
                     this.props.updateAppState(stateObj);
                     this.props.history.push("/members");
                  }
               });
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

   handleCharSubmit = () => {
      const { characterName, characterClass, characterRace } = this.state;
      const characterLevel = parseInt(this.state.characterLevel);
      API.characterCreate({
         characterName,
         characterClass,
         characterRace,
         characterLevel
      }).then(({ data }) => {
         this.setState(
            {
               characterName: "",
               characterRace: "",
               characterClass: "",
               characterLevel: ""
            },
            () => {
               if (this.props.newCharConfirm) {
                  const spellIdArr = this.props.spellsArr.map(spell => spell.id);
                  const characterId = data.id;
                  API.spellBulk({ spellIdArr, characterId }).then(() => {
                     this.props.getUserData({ showChar: false, newCharConfirm: false });
                     this.props.history.push("/character/" + data.id);
                  });
               }
               else {
                  this.props.getUserData({ showChar: false });
               }
            }
         );
      });
   };

   render() {
      return (
         <>
            {/* Auth Modal */}
            <Modal show={this.props.showAuth} onHide={() => this.props.updateAppState({ showAuth: false })}>
               <Modal.Header closeButton>
                  <Modal.Title>{this.props.type}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form onSubmit={this.handleAuthSubmit}>
                     {this.props.type === "Sign Up" && (
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
                     {this.props.type === "Sign Up" && (
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
                     {this.props.spellsArr.length ? (
                        <Form.Group controlId="formGroupCheck">
                           <Form.Check
                              type="checkbox"
                              label="Create Character using Spells"
                              value={this.props.newCharConfirm}
                              onClick={() => this.props.updateAppState({ newCharConfirm: !this.props.newCharConfirm })}
                           />
                        </Form.Group>
                     ) : ""}
                  </Form>
               </Modal.Body>
               <Modal.Footer>
                  {this.state.errorMessage && (
                     <div className="feedback">{this.state.errorMessage}</div>
                  )}
                  <Button variant="secondary" onClick={() => this.props.updateAppState({ showAuth: false })}>
                     Close
                  </Button>
                  <Button variant="dark" onClick={this.handleAuthSubmit}>
                     {this.props.type}
                  </Button>
               </Modal.Footer>
            </Modal>

            {/* Character Modal */}
            <Modal show={this.props.showChar} onHide={() => this.props.updateAppState({ showChar: false })}>
               <Modal.Header closeButton>
                  <Modal.Title>New Character</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form onSubmit={this.handleCharSubmit}>
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
                        <FormComplete
                           list="race"
                           name="characterRace"
                           value={this.state.characterRace}
                           handleInputChange={this.handleInputChange}
                        />
                     </Form.Group>
                     <Form.Group controlId="formCharacterClass">
                        <Form.Label>Class</Form.Label>
                        <FormComplete
                           list="class"
                           name="characterClass"
                           value={this.state.characterClass}
                           handleInputChange={this.handleInputChange}
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
                  <Button variant="secondary" onClick={() => this.props.updateAppState({ showChar: false })}>
                     Close
                  </Button>
                  <Button variant="dark" onClick={this.handleCharSubmit}>
                     Save
               </Button>
               </Modal.Footer>
            </Modal>
         </>
      );
   };
};

export default withRouter(Modals);