// Dependencies
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modals from "../../components/Modals";
import API from "../../utils/API";
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
  }

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
      this.setState(
        {
          show: false,
          characterName: "",
          characterRace: "",
          characterClass: "",
          characterLevel: ""
        },
        this.getUserData
      );
    });
  };

  handleCardClick = characterId => {
    this.props.history.push("/character/" + characterId);
  };

  handleDelete = (event, characterId) => {
    event.stopPropagation();
    API.characterDelete(characterId).then(response => {
      this.setState({ characterArr: response.data });
    });
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <div className="col-md-6 col-md-offset-3">
          <h2>Welcome {this.state.name}!</h2>
          <Button onClick={this.handleOpen} variant="dark">
            Create a New Character
            </Button>
          {this.state.characterArr.reverse().map((element, i) => {
            return <Card key={i} border="dark" bsPrefix="card character-card" onClick={() => this.handleCardClick(element.id)}>
              <Card.Body>
                <Card.Title>
                  <span className="character-title">{element.characterName}</span>
                  <Badge onClick={(event) => this.handleDelete(event, element.id)} variant="light">X</Badge>
                </Card.Title>
                <Card.Text>
                  Level {element.characterLevel} {element.characterRace} {element.characterClass}
                </Card.Text>
              </Card.Body>
            </Card>
          })}
        </div>
        <Modals />
      </Row>
    );
  }
}

// Export
export default withRouter(Members);
