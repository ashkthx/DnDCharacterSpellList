// Dependencies
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import Row from "react-bootstrap/Row";
import "./Members.css";

class Members extends Component {
  state = {
    name: "",
    characterArr: [],
    isLoggedIn: true,

    // Modal
    show: false,
    type: "Character",
    errorMessage: null,

    // Form
    characterName: "",
    characterRace: "",
    characterClass: "",
    characterLevel: ""
  };

  componentWillMount() {
   this.getUserData();
  };

  getUserData = () => {
    API.userInfo().then(response => {
      if (response.data.name) {
        this.setState(response.data);
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOpen = () => {
    this.setState({
      show: true
    });
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.type === "Character") {
      this.characterCreate();
    }
  };

  characterCreate = () => {
    const { characterName, characterClass, characterRace } = this.state;
    const characterLevel = parseInt(this.state.characterLevel);
    API.characterCreate({
      characterName,
      characterClass,
      characterRace,
      characterLevel
    }).then(response => {
      console.log("Created character");
      this.setState({
        show: false,
        characterName: "",
        characterRace: "",
        characterClass: "",
        characterLevel: ""
      }, this.getUserData);
    });
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Row>
          <div className="col-md-6 col-md-offset-3">
            <h2>Welcome {this.state.name}!</h2>
            <Button onClick={this.handleOpen} variant="dark">
              Create a New Character
            </Button>
            {/* Put characters here  */}
          </div>
        </Row>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New {this.state.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit}>
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
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCharacterClass">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  name="characterClass"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCharacterLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  name="characterLevel"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
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
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Export
export default Members;
