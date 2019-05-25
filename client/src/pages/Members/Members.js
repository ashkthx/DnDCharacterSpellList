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
    id: "",
    isLoggedIn: true,

    // Modal
    show: false,
    type: "Character",
    errorMessage: null,

    // Form
    characterName: "",
    race: "",
    class: "",
    level: ""
  };

  componentWillMount() {
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

  handleFormSubmit = () => {
    console.log("Submitted form");
  };

  createCharacter = () => {
    console.log("Character created");
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
            <Button onClick={this.handleOpen} variant="dark">Create a New Character</Button>
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
                  name="race"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCharacterClass">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  name="class"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCharacterLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  name="level"
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
